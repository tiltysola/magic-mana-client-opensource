import { useEffect, useRef, useState } from 'react';

import { useUpdateEffect } from 'ahooks';
import keycode from 'keycode';

import './style.less';

interface Props {
  value?: string[];
  onChange?: (value: string[]) => void;
}

const Index = (props: Props) => {
  const { value, onChange } = props;

  const [shortcutKey, setShortcutKey] = useState<any[]>(value || []);

  const isEditingRef = useRef<any>(false);
  const shortcutKeyRef = useRef<any[]>(shortcutKey);

  const handleShortcutClear = () => {
    setShortcutKey([]);
    onChange && onChange([]);
  };

  useEffect(() => {
    shortcutKeyRef.current = shortcutKey;
  }, [shortcutKey]);

  useUpdateEffect(() => {
    if (value) {
      setShortcutKey([...value]);
    }
  }, [value]);

  return (
    <div className="setting-shortcut">
      <input
        className="setting-shortcut-input"
        value={shortcutKey.join('+') || ''}
        placeholder="尚未输入"
        onKeyDown={(e: any) => {
          const keyCode = keycode(e)[0].toUpperCase() + keycode(e).substring(1);
          if (isEditingRef.current === false) {
            isEditingRef.current = true;
            setShortcutKey([keyCode]);
          } else if (isEditingRef.current === true && !shortcutKeyRef.current.includes(keyCode)) {
            setShortcutKey([...shortcutKeyRef.current, keyCode]);
          }
        }}
        onKeyUp={() => {
          isEditingRef.current = false;
          onChange && onChange([...shortcutKey]);
        }}
      />
      <button className="setting-shortcut-clear" onClick={handleShortcutClear}>
        清空
      </button>
    </div>
  );
};

export default Index;
