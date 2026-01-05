'use client';

import React from 'react';

export function DynamicBackground() {
    return (
        <div className="absolute inset-0 w-full h-full -z-10 overflow-hidden bg-background">
            {/* Base gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-background via-muted/20 to-background" />

            {/* Animated blobs/gradients */}
            <div className="absolute -top-[25%] -left-[25%] w-[75%] h-[75%] rounded-full bg-primary/20 blur-3xl animate-blob mix-blend-multiply filter" />
            <div className="absolute top-[10%] -right-[25%] w-[75%] h-[75%] rounded-full bg-secondary/20 blur-3xl animate-blob mix-blend-multiply filter" style={{ animationDelay: '2s' }} />
            <div className="absolute -bottom-[25%] left-[20%] w-[75%] h-[75%] rounded-full bg-accent/20 blur-3xl animate-blob mix-blend-multiply filter" style={{ animationDelay: '4s' }} />

            {/* Pattern overlay (optional for texture) */}
            <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)', backgroundSize: '40px 40px' }} />
        </div>
    );
}
