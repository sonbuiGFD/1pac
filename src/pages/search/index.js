import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { isEmpty } from 'lodash';

import Header from 'components/header';
import Footer from 'components/footer';
import InPageLoading from 'components/inPageLoading';
import NewsDetailModal from 'components/newsDetailModal';

import { truncate } from 'utils';

import { getHeadlines, updateSelectedNews, loadmoreHeadlines } from './action';

import './style.scss';

const Home = ({
  getHeadlinesAction,
  articles,
  isLoading,
  selectedNews,
  updateSelectedNewsAction,
  isShowCTA,
  loadmoreHeadlinesAction,
  curPage,
}) => {
  useEffect(() => {
    getHeadlinesAction({ country: 'us' });
  }, [getHeadlinesAction]);

  const loadMore = () => {
    loadmoreHeadlinesAction({ country: 'us', page: curPage + 1 });
  };
  return (
    <div className="onepac">
      <Header />
      <main className="body__main">
        <div className="container">
          <h1 className="page_title">Top Headlines</h1>
          <div className="row news__list">
            {articles.map((article) => (
              <div
                onClick={() => updateSelectedNewsAction(article)}
                className="col-12 col-md-6 col-lg-4 "
                key={`home_news_item_${article.title}`}
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
const mapStateToProps = ({ home }) => ({
  articles: home.data.articles,
  isLoading: home.ui.isLoading,
  selectedNews: home.ui.selectedNews,
  isShowCTA: home.ui.isShowCTA,
  curPage: home.ui.curPage,
});

const mapDispatchToProps = {
  getHeadlinesAction: getHeadlines,
  updateSelectedNewsAction: updateSelectedNews,
  loadmoreHeadlinesAction: loadmoreHeadlines,
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
