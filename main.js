const articleContainer = document.querySelector('.articleContainer');

window.addEventListener('load', e => {
  getNews();
});

if ('serviceWorker' in navigator) {
  navigator.serviceWorker
    .register('./sw.js')
    .then(() => {
      console.log('service worker has been installed');
    })
    .catch(err => console.log(`Error: ${err}`));

  if (navigator.serviceWorker.controller) {
    console.log('This page is currently controlled by:', navigator.serviceWorker.controller);
  }

  navigator.serviceWorker.oncontrollerchange = function() {
    console.log('This page is now controlled by:', navigator.serviceWorker.controller);
  };
} else {
  console.log('Service workier arenot supported');
}

const getNews = async () => {
  const res = await fetch(
    'https://newsapi.org/v2/top-headlines?sources=bbc-news&apiKey=e2652f02b2ce467b86d14103c40cf46d',
  );

  const json = await res.json();
  articleContainer.innerHTML = json.articles.map(e => makeTemplate(e));
};

const makeTemplate = data => {
  return `<p>${data.title}</p>`;
};
