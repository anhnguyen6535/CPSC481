import React, { useState } from 'react';
import styles from './ReadMore.module.scss';

interface ReadMoreProps {
  content: string;
  maxLength?: number;
}

const ReadMore: React.FC<ReadMoreProps> = ({ content, maxLength = 100 }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const truncatedContent = isExpanded || content.length <= maxLength ? content : `${content.slice(0, maxLength)}...`;

  const toggleReadMore = () => {
    setIsExpanded(!isExpanded);
  };

  const renderReadMoreLink = () => {
    if (isExpanded) {
      return (
        <span onClick={toggleReadMore} className={styles.readLink}>
          Read Less
        </span>
      );
    } else {
      return (
        <span onClick={toggleReadMore} className={styles.readLink}>
          Read More
        </span>
      );
    }
  };

  return (
    <div>
      <div className={styles.content}>
        {truncatedContent}
        {content.length > maxLength && renderReadMoreLink()}
      </div>
    </div>
  );
};

export default ReadMore;
