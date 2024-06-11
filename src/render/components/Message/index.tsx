import { useEffect, useRef, useState } from 'react';

import Icon from '../Icon';

import './style.less';

export const message: {
  show: (message: MessageProps) => void;
  hide: (key: string) => void;
} = {} as any;

interface MessageProps {
  key?: string;
  content: string | JSX.Element | JSX.Element[];
  footer?: string | JSX.Element | JSX.Element[];
  onOk?: () => boolean; // TRUE equals to PREVENT HIDE
  onCancel?: () => boolean; // TRUE equals to PREVENT HIDE
}

const Index = () => {
  const [messageList, setMessageList] = useState<any[]>([]);

  const messageListRef = useRef(messageList);

  useEffect(() => {
    message.show = ({
      key: _key,
      content: _content,
      footer: _footer,
      onOk,
      onCancel,
    }: MessageProps) => {
      const key = _key || `rkey-${Math.random().toString().split('.')[1]}`;
      let content = _content;
      try {
        if (
          typeof _content !== 'string' &&
          typeof (_content as any)[`${'$$typeof'}`] !== 'symbol'
        ) {
          content = JSON.stringify(_content);
        }
      } catch (e) {}
      let footer = _footer;
      try {
        if (
          typeof _footer !== 'string' &&
          typeof (_footer as any)[`${'$$typeof'}`] !== 'symbol'
        ) {
          footer = JSON.stringify(_footer);
        }
      } catch (e) {}
      messageListRef.current = [
        ...messageListRef.current,
        {
          key,
          content,
          footer,
          onOk,
          onCancel,
        },
      ];
      setMessageList(messageListRef.current);
    };
    message.hide = (key: string) => {
      messageListRef.current = messageListRef.current.filter(
        (v) => v.key !== key,
      );
      setMessageList(messageListRef.current);
    };
  }, []);

  return (
    <>
      {messageList.map((msg) => (
        <div key={msg.key} className="message-shadow">
          <div className="message-card">
            <div className="message-card-content">
              {typeof msg.content === 'string' ? (
                <span>{msg.content}</span>
              ) : (
                msg.content
              )}
            </div>
            <div className="message-card-footer">
              {msg.footer || (
                <div className="message-card-button">
                  <button
                    className="message-card-button-deny"
                    onClick={() => {
                      if (!msg.onCancel?.()) {
                        messageListRef.current = messageList.filter(
                          (v) => v.key !== msg.key,
                        );
                        setMessageList(messageListRef.current);
                      }
                    }}
                  >
                    <Icon type="icon-close-bold" />
                  </button>
                  <button
                    className="message-card-button-confirm"
                    onClick={() => {
                      if (!msg.onOk?.()) {
                        messageListRef.current = messageList.filter(
                          (v) => v.key !== msg.key,
                        );
                        setMessageList(messageListRef.current);
                      }
                    }}
                  >
                    <Icon type="icon-circle" />
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default Index;
