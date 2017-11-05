import path from 'path';
import axios from 'axios';
import orderBy from 'lodash.orderby';
import getArticleList from './utils/getArticleList';

const filePaths = {
  news: path.resolve(__dirname, '../articles/news/**/*.md'),
  projects: path.resolve(__dirname, '../articles/projects/**/*.md'),
  members: path.resolve(__dirname, '../articles/members/**/*.md'),
};

async function getRoutes() {
  const { data: posts } = await axios.get('https://jsonplaceholder.typicode.com/posts');
  const newsList = await getArticleList(filePaths.news, {
    permalink: 'https://news.miyashita.com/:years/:months/:date/:title',
  });
  const projectList = await getArticleList(filePaths.projects, { permalink: '/projects/:title' });
  const memberList = await getArticleList(filePaths.members, { permalink: '/members/:title' });

  return [
    {
      path: '/',
      component: 'src/containers/Home',
      getProps: () => ({
        news: newsList.slice(0, 10),
        projects: projectList.filter(i => i.visibleOnTopPage),
        members: orderBy(
          memberList.filter(i => i.category !== '99_OB'),
          ['category', 'school_year', 'title'],
          ['asc', 'desc', 'asc'],
        ),
      }),
    },
    {
      path: '/about',
      component: 'src/containers/About',
    },
    {
      path: '/blog',
      component: 'src/containers/Blog',
      getProps: () => ({
        posts,
      }),
      children: posts.map(post => ({
        path: `/post/${post.id}`,
        component: 'src/containers/Post',
        getProps: () => ({
          post,
        }),
      })),
    },
    {
      is404: true,
      component: 'src/containers/404',
    },
  ];
}

export default getRoutes;
