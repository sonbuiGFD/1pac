import React from 'react';
import { Modal } from 'reactstrap';

import { formatDate } from 'utils';

import './style.scss';

const NewsDetailModal = (props) => {
  const { isOpen, data, toggle } = props;
  return (
    <Modal isOpen={isOpen} toggle={toggle} size="lg" className="news_modal modal-dialog-centered modal-no-border">
      <button type="button" onClick={toggle} className="close">
        ×
      </button>
      <div className="news_modal__content">
        <div className="news_modal__tit">{data.title}</div>
        <div className="news_modal__info">
          <span>By</span> <span className="article__author">{data.author}</span>
          <span className="pipe">|</span>
          <span className="article__updated">
            Published: <time dateTime="formatDate(data.publishedAt)">{formatDate(data.publishedAt)}</time>
          </span>
          <span className="pipe">|</span>
          <span className="article__updated">
            Source: <span>{data.source && data.source.name}</span>
          </span>
        </div>
        <div className="news_modal__img">
          <img src={data.urlToImage} alt={data.title} />
        </div>
        <div className="news_modal__des">{data.content}</div>

        <a target="_blank" rel="noopener noreferrer" className="news_modal__link" href={data.url}>
          Read More
        </a>
      </div>
    </Modal>
  );
};
export default NewsDetailModal;
