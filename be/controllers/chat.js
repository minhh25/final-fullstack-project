import Product from "../models/product.js";

function localAnswer(q, products) {
  if (!products.length)
    return "Mình chưa tìm thấy sản phẩm phù hợp trong cửa hàng. Bạn thử nói rõ tên/loại sản phẩm (vd: coffee, tea, vegetables) nhé.";

  const lines = products.slice(0, 8).map((p) => {
    const price = Number(p.discountPrice ?? p.price);
    const safePrice = Number.isFinite(price) ? price.toFixed(2) : "N/A";
    return `• ${p.name} — $${safePrice} (${p.department || "unknown"}/${p.category || "unknown"})`;
  });

  return `Mình gợi ý vài sản phẩm liên quan:\n${lines.join("\n")}`;
}

async function callGeminiGenerateContent({ apiKey, model, prompt }) {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(
    model
  )}:generateContent?key=${encodeURIComponent(apiKey)}`;

  const resp = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      contents: [{ role: "user", parts: [{ text: prompt }] }],
      // bạn có thể tune thêm generationConfig nếu muốn
      // generationConfig: { temperature: 0.7, maxOutputTokens: 512 },
    }),
  });

  const data = await resp.json().catch(() => ({}));

  if (!resp.ok) {
    const msg =
      data?.error?.message ||
      `Gemini error ${resp.status}: ${resp.statusText}`;
    const err = new Error(msg);
    err.status = resp.status;
    err.data = data;
    throw err;
  }

  // Parse text from response
  const text =
    data?.candidates?.[0]?.content?.parts?.map((p) => p.text).join("") || "";

  return { text, raw: data };
}

// GET /chat/models
export const listGeminiModels = async (req, res) => {
  try {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) return res.status(500).json({ message: "Missing GEMINI_API_KEY" });

    const url = `https://generativelanguage.googleapis.com/v1beta/models?key=${encodeURIComponent(
      apiKey
    )}`;

    const resp = await fetch(url);
    const data = await resp.json();

    if (!resp.ok) {
      return res.status(resp.status).json({
        message: data?.error?.message || "Cannot list models",
        raw: data,
      });
    }

    // data.models: [{name: "models/xxx", supportedGenerationMethods: [...]}, ...]
    return res.json(data);
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
};

// POST /chat
export const chatWithAI = async (req, res) => {
  let products = [];
  try {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) return res.status(500).json({ message: "Missing GEMINI_API_KEY" });

    const { message } = req.body;
    if (!message?.trim()) {
      return res.status(400).json({ message: "Message is required" });
    }

    const q = message.trim().toLowerCase();

    // tìm sản phẩm liên quan để gợi ý
    products =
      q.includes("best deal") || q.includes("best-deal")
        ? await Product.find({ tags: "best-deal" }).limit(8).lean()
        : await Product.find({
            $or: [
              { name: { $regex: q, $options: "i" } },
              { category: { $regex: q, $options: "i" } },
              { department: { $regex: q, $options: "i" } },
            ],
          })
            .limit(8)
            .lean();

    const prompt = `
Bạn là trợ lý mua sắm Clovers. Người dùng có thể hỏi BẤT KỲ câu gì.
Nếu có sản phẩm liên quan thì gợi ý dựa trên danh sách.
Nếu không có sản phẩm, vẫn trả lời tự nhiên.

SẢN PHẨM GỢI Ý (có thể rỗng):
${JSON.stringify(products)}

CÂU HỎI:
${message}

Trả lời tiếng Việt, ngắn gọn, thân thiện. Nếu gợi ý sản phẩm, ưu tiên liệt kê 3-5 món.
`.trim();

    // ✅ Thử lần lượt nhiều model (đỡ lỗi “đổi model vẫn sai”)
    // Bạn cũng có thể set GEMINI_MODEL trong .env để ép 1 model cố định
    const preferred = process.env.GEMINI_MODEL?.trim();
    const candidateModels = [
      preferred,
      "gemini-2.0-flash",
      "gemini-1.5-flash",
      "gemini-1.5-pro",
    ].filter(Boolean);

    let lastErr = null;
    for (const model of candidateModels) {
      try {
        const out = await callGeminiGenerateContent({ apiKey, model, prompt });
        const reply = out.text || "";
        return res.status(200).json({ reply, matchedProducts: products, modelUsed: model });
      } catch (e) {
        lastErr = e;
        // thử model tiếp theo
      }
    }

    // nếu tất cả model fail
    throw lastErr || new Error("Gemini failed");
  } catch (err) {
    console.log("CHAT ERROR >>>", err?.message);

    // fallback local
    const q = (req.body?.message || "").trim().toLowerCase();
    const reply = localAnswer(q, products);

    return res.status(200).json({
      reply,
      matchedProducts: products,
      note: "Gemini is unavailable right now. Returned local suggestions.",
      geminiError: err?.message,
    });
  }
};
