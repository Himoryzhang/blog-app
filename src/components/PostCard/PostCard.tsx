import type { FC } from 'react';
import './PostCard.css';

export type PostCardProps = {
  href: string;
  metaItems: string[];
  title: string;
  description: string;
};

const PostCard: FC<PostCardProps> = ({ href, metaItems, title, description }) => (
  <a className="post-card" href={href}>
    <div className="post-card__body">
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
    <div className="post-card__footer">
      <span>阅读全文</span>
      <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true">
        <path
          d="M4 8h8m0 0-3-3m3 3-3 3"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  </a>
);

export default PostCard;

