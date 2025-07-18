import React, { useState, useRef, useEffect } from 'react';

export default function TagInput({
  placeholder = "Type and hit Enter",
  defaultTags = [],
  exampleTags = [],
  onTagsChange = () => {}
}) {
  const [tags, setTags] = useState(defaultTags);
  const [examples, setExamples] = useState(exampleTags);
  const textareaRef = useRef(null);

  // Avoid infinite loop by only updating if values are different
  useEffect(() => {
    if (JSON.stringify(tags) !== JSON.stringify(defaultTags)) {
      setTags(defaultTags);
    }
  }, [defaultTags]);

  useEffect(() => {
    if (JSON.stringify(examples) !== JSON.stringify(exampleTags)) {
      setExamples(exampleTags);
    }
  }, [exampleTags]);

  useEffect(() => {
    onTagsChange(tags);
  }, [tags, onTagsChange]);

  const addTag = (value) => {
    const trimmed = value.trim();
    if (!trimmed) return;

    if (examples.includes(trimmed)) {
      setExamples(prev => prev.filter((ex) => ex !== trimmed));
    }

    if (!tags.includes(trimmed)) {
      setTags(prev => [...prev, trimmed]);
    }
  };

  const removeTag = (idx) => {
    setTags(prev => prev.filter((_, i) => i !== idx));
  };

  const handleKeyDown = (e) => {
    if ((e.key === 'Enter' || e.key === ',') && textareaRef.current.value) {
      e.preventDefault();
      addTag(textareaRef.current.value);
      textareaRef.current.value = '';
      textareaRef.current.focus();
    }
  };

  return (
    <div className="flex flex-wrap items-start gap-2 p-2 bg-white border-[#273BE280] rounded-[10px] border-[2px]">
      {tags.map((tag, i) => (
        <span
          key={`tag-${i}`}
          className="flex items-center border border-primary rounded-full text-[16px] px-4 py-2"
        >
          {tag}
          <button onClick={() => removeTag(i)} className="ml-2 text-primary">
            &times;
          </button>
        </span>
      ))}

      {examples.map((tag, i) => (
        <span
          key={`example-${i}`}
          className="flex items-center border border-gray-400 text-gray-400 italic rounded-full text-[16px] px-4 py-2"
        >
          {tag}
        </span>
      ))}

      <textarea
        ref={textareaRef}
        rows={6}
        onKeyDown={handleKeyDown}
        className="flex-1 min-w-[100px] bg-transparent outline-none resize-none text-sm leading-tight"
        placeholder={placeholder}
      />
    </div>
  );
}
