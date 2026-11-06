'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { Search, X, ArrowRight } from 'lucide-react';
import { TOOLS, type ToolDefinition } from '@/config/tools';
import { ToolIcon } from './ToolIcon';

export interface ToolSearchProps {
  className?: string;
  placeholder?: string;
}

export const ToolSearch: React.FC<ToolSearchProps> = ({
  className = '',
  placeholder = 'Search all tools (Press "/" or "⌘K")...',
}) => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  // Filter tools based on query
  const filteredTools = query.trim()
    ? TOOLS.filter((t) => {
        const q = query.toLowerCase();
        return (
          t.name.toLowerCase().includes(q) ||
          t.shortDescription.toLowerCase().includes(q) ||
          t.tags.some((tag) => tag.toLowerCase().includes(q)) ||
          t.keywords.some((k) => k.toLowerCase().includes(q))
        );
      })
    : TOOLS.slice(0, 8); // show 8 popular/first tools when empty

  // Handle hotkeys (⌘K / Ctrl+K and /)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.key === 'k' && (e.metaKey || e.ctrlKey)) || (e.key === '/' && !isOpen)) {
        const target = e.target as HTMLElement;
        // Don't trigger if already typing in an input
        if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA') {
          return;
        }
        e.preventDefault();
        setIsOpen(true);
      } else if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setSelectedIndex(0);
    } else {
      setQuery('');
    }
  }, [isOpen]);

  const handleSelect = (tool: ToolDefinition) => {
    setIsOpen(false);
    router.push(`/tools/${tool.slug}`);
  };

  const handleListKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % Math.max(1, filteredTools.length));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + filteredTools.length) % Math.max(1, filteredTools.length));
    } else if (e.key === 'Enter' && filteredTools[selectedIndex]) {
      e.preventDefault();
      handleSelect(filteredTools[selectedIndex]);
    }
  };

  return (
    <>
      {/* Trigger Bar */}
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className={`w-full flex items-center justify-between h-12 px-4 rounded-full bg-white/90 border border-[#E7E7E4] shadow-sm hover:border-[#4F46E5]/50 transition-all text-left text-sm text-[#5B5B66] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4F46E5] cursor-pointer ${className}`}
        aria-label="Open tool search"
      >
        <span className="flex items-center gap-2.5 truncate">
          <Search className="w-4 h-4 text-[#5B5B66] shrink-0" />
          <span className="truncate">{placeholder}</span>
        </span>
        <span className="hidden sm:inline-flex items-center gap-1 text-[11px] font-medium px-2 py-0.5 rounded bg-[#F4F4F2] text-[#5B5B66] border border-[#E7E7E4]/60">
          <kbd>⌘</kbd>
          <kbd>K</kbd>
        </span>
      </button>

      {/* Dialog Modal */}
      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-black/40"
          onClick={(e) => {
            if (e.target === e.currentTarget) setIsOpen(false);
          }}
          role="dialog"
          aria-modal="true"
          aria-label="Search tools"
        >
          <div className="w-full max-w-2xl bg-white border border-[#E7E7E4] rounded-[24px] shadow-2xl overflow-hidden flex flex-col max-h-[80vh] animate-in fade-in zoom-in-95 duration-150">
            {/* Input Header */}
            <div className="relative flex items-center border-b border-[#E7E7E4] px-4 py-3 bg-[#FAFAF9]">
              <Search className="w-5 h-5 text-[#5B5B66] shrink-0 mr-3" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setSelectedIndex(0);
                }}
                onKeyDown={handleListKeyDown}
                placeholder="Search tools by name, tag, or keyword..."
                className="w-full bg-transparent border-none text-base text-[#0B0B0F] placeholder-[#5B5B66] focus:outline-none focus:ring-0"
              />
              {query && (
                <button
                  type="button"
                  onClick={() => setQuery('')}
                  className="p-1 text-[#5B5B66] hover:text-[#0B0B0F] rounded-full mr-2"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="text-xs font-semibold px-2 py-1 rounded bg-white border border-[#E7E7E4] text-[#5B5B66]"
              >
                ESC
              </button>
            </div>

            {/* Results List */}
            <div className="overflow-y-auto p-2 divide-y divide-[#F4F4F2]">
              {filteredTools.length === 0 ? (
                <div className="py-12 text-center text-sm text-[#5B5B66]">
                  No tools found matching &quot;{query}&quot;
                </div>
              ) : (
                filteredTools.map((tool, idx) => {
                  const isSelected = idx === selectedIndex;
                  return (
                    <div
                      key={tool.slug}
                      onClick={() => handleSelect(tool)}
                      onMouseEnter={() => setSelectedIndex(idx)}
                      className={`flex items-center justify-between p-3 rounded-xl cursor-pointer transition-colors ${
                        isSelected ? 'bg-[#EEF0FF] text-[#0B0B0F]' : 'hover:bg-[#F4F4F2]'
                      }`}
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="w-9 h-9 rounded-lg bg-white border border-[#E7E7E4] flex items-center justify-center text-[#4F46E5] shrink-0">
                          <ToolIcon name={tool.icon} className="w-4 h-4" />
                        </div>
                        <div className="min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-semibold text-[#0B0B0F] truncate">
                              {tool.name}
                            </span>
                            <span className="text-[10px] font-medium px-1.5 py-0.2 rounded bg-white text-[#5B5B66] border border-[#E7E7E4]">
                              {tool.category}
                            </span>
                          </div>
                          <p className="text-xs text-[#5B5B66] truncate">
                            {tool.shortDescription}
                          </p>
                        </div>
                      </div>
                      <ArrowRight
                        className={`w-4 h-4 shrink-0 ml-2 transition-transform ${
                          isSelected ? 'text-[#4F46E5] translate-x-0.5' : 'text-transparent'
                        }`}
                      />
                    </div>
                  );
                })
              )}
            </div>

            {/* Footer */}
            <div className="border-t border-[#E7E7E4] px-4 py-2 bg-[#FAFAF9] text-[11px] text-[#5B5B66] flex items-center justify-between">
              <span>Navigate with ↑ and ↓, press Enter to open</span>
              <span>100% Client-Side Processing</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

