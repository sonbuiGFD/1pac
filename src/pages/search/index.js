import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { isEmpty } from 'lodash';

import Header from 'components/header';
import Footer from 'components/footer';
import InPageLoading from 'components/inPageLoading';
import NewsDetailModal from 'components/newsDetailModal';

import { truncate } from 'utils';

import { getNews, updateSelectedNews, loadmoreNews } from './action';

import './style.scss';

const keywords = ['bitcoin', 'apple', 'earthquake', 'animal'];

const Search = ({
  getNewsAction,
  articles,
  isLoading,
  selectedNews,
  updateSelectedNewsAction,
  isShowCTA,
  loadmoreNewsAction,
  curPage,
}) => {
  const [keyword, setKeyword] = useState(keywords[0]);

  useEffect(() => {
    getNewsAction({ q: keyword });
  }, [getNewsAction, keyword]);

  const handleSelect = ({ target }) => {
    const value = target.getAttribute('data');
    setKeyword(value || '');
  };

  const loadMore = () => {
    loadmoreNewsAction({ q: keyword, page: curPage + 1 });
  };
  return (
    <div className="onepac">
      <Header />
      <main className="body__main">
        <div className="container">
          <div className="search_banner">
            <h1 className="page_title">Search</h1>
            <div className="search_banner__content">
              {keywords.map((key) => (
                <button
                  className={`search_banner__item ${keyword === key ? 'active' : ''}`}
                  data={key}
                  key={`search_key_word_${key}`}
                  type="button"
                  onClick={handleSelect}
                >
                  {key}
                </button>
              ))}
            </div>
          </div>
          <div className="row news__list">
            {articles.map((article) => (
              <div
                onClick={() => updateSelectedNewsAction(article)}
                className="col-12 col-md-6 col-lg-4 "
                key={`news_news_item_${article.title}`}
              >
                <div className="news__item">
                  <div className="news__img">
                    <img src={article.urlToImage} alt={article.title} />
                  </div>
                  <div className="news__tit">{truncate(article.title, 80)}</div>
                </div>
              </div>
            ))}
          </div>
          {isShowCTA ? (
            <div className="news__action text-center mb-5">
              <button onClick={loadMore} type="button" className="news_modal__link button_cta">
                Load More
              </button>
            </div>
          ) : null}
        </div>
      </main>
      <Footer />
      <InPageLoading isLoading={isLoading} />
      <NewsDetailModal
        isOpen={!isEmpty(selectedNews)}
        toggle={() => updateSelectedNewsAction({})}
        data={selectedNews}
      />
    </div>
  );
};
const mapStateToProps = ({ search }) => ({
  articles: search.data.articles,
  isLoading: search.ui.isLoading,
  selectedNews: search.ui.selectedNews,
  isShowCTA: search.ui.isShowCTA,
  curPage: search.ui.curPage,
});

const mapDispatchToProps = {
  getNewsAction: getNews,
  updateSelectedNewsAction: updateSelectedNews,
  loadmoreNewsAction: loadmoreNews,
};

export default connect(mapStateToProps, mapDispatchToProps)(Search);
