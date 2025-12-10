import React from 'react';


export default function Feature(_ref) {
    var title = _ref.title, subtitle = _ref.subtitle, children = _ref.children;
    return (
        <div className="flex flex-col items-start gap-3">
            <div className="p-4 rounded-md bg-white shadow-sm">{children}</div>
            <div className="font-semibold">{title}</div>
            <div className="text-sm text-gray-600">{subtitle}</div>
        </div>
    );
}