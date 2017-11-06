import path from 'path';
import orderBy from 'lodash.orderby';
import getArticleList from './utils/getArticleList';

const filePaths = {
  news: path.resolve(__dirname, '../articles/news/**/*.md'),
  projects: path.resolve(__dirname, '../articles/projects/**/*.md'),
  members: path.resolve(__dirname, '../articles/members/**/*.md'),
};

async function getRoutes() {
  const newsList = await getArticleList(filePaths.news, {
    permalink: 'https://news.miyashita.com/:year/:month/:day/:title/',
  });
  const projectList = await getArticleList(filePaths.projects, { permalink: '/projects/:title/' });
  const memberList = await getArticleList(filePaths.members, { permalink: '/members/:title/' });

  return [
    {
      path: '/',
      component: 'src/containers/Home',
      getProps: () => ({
        news: newsList.slice(0, 10).map(i => ({ ...i, content: null })),
        projects: projectList
          .filter(i => i.visibleOnTopPage)
          .map(i => ({ ...i, date: null, content: null })),
        members: orderBy(
          memberList.filter(i => i.category !== '99_OB'),
          ['category', 'school_year', 'title'],
          ['asc', 'desc', 'asc'],
        ).map(i => ({ ...i, content: null })),
      }),
    },
    ...memberList.map(info => ({
      path: info.permalink,
      component: 'src/containers/Member',
      getProps: () => ({ member: info }),
    })),
    ...projectList.map(info => ({
      path: info.permalink,
      component: 'src/containers/Project',
      getProps: () => ({ project: info }),
    })),
    {
      path: '/about',
      component: 'src/containers/About',
    },
    {
      is404: true,
      component: 'src/containers/404',
    },
  ];
}

export default getRoutes;
