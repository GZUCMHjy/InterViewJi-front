import React from 'react';
import './index.css'
export default function GlobalFooter()  {
    const currentYear = new Date().getFullYear()
    return (
        <div
            className="global-footer"
        >
            <div>@ {currentYear} 面试刷题平台</div>
            <div>by Louis Design</div>
        </div>
    );
};
