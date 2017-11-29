import path from 'path';
import orderBy from 'lodash.orderby';
import getArticleList from './utils/getArticleList';

const filePaths = {
  news: path.resolve(__dirname, '../articles/news/**/*.md'),
  projects: path.resolve(__dirname, '../articles/projects/**/*.md'),
  members: path.resolve(__dirname, '../articles/members/**/*.md'),
  articles: path.resolve(__dirname, '../articles/articles/**/*.md'),
};

// https://github.com/nozzle/react-static/wiki/How-to:-Pagination
function makePageRoutes(items, pageSize, route) {
  const itemsCopy = [...items]; // Make a copy of the items
  const pages = []; // Make an array for all of the different pages

  while (itemsCopy.length) {
    // Splice out all of the items into separate pages using a set pageSize
    pages.push(itemsCopy.splice(0, pageSize));
  }

  const maxCount = pages.length;
  const firstPage = pages.shift();

  const routes = [
    {
      ...route,
      path: `${route.path}/`,
      getProps: async () => ({
        page: {
          items: firstPage,
          count: 1,
          maxCount,
          basePath: route.path,
        },
      }),
    },
    ...pages.map((page, i) => ({
      ...route,
      path: `${route.path}/page/${i + 2}/`,
      getProps: async () => ({
        page: {
          items: page,
          count: i + 2,
          maxCount,
          basePath: route.path,
        },
      }),
    })),
  ];

  return routes;
}

async function getRoutes() {
  const newsList = await getArticleList(filePaths.news, {
    permalink: '/news/:year/:month/:day/:title/',
  });
  const projectList = await getArticleList(filePaths.projects, {
    permalink: '/projects/:title/',
  });
  const memberList = await getArticleList(filePaths.members, { permalink: '/members/:title/' });
  const othersList = await getArticleList(filePaths.articles);

  const projectCategories = Array.from(new Set(projectList.map(p => p.category)));
  const projectListGroupByCategories = {};
  for (const category of projectCategories) {
    projectListGroupByCategories[category] = projectList
      .filter(p => p.category === category)
      .map(i => ({ ...i, date: undefined, content: undefined, filePath: undefined }));
  }

  const currentMemberList = orderBy(
    memberList.filter(i => i.category !== '99_OB'),
    ['category', 'school_year', 'title'],
    ['asc', 'desc', 'asc'],
  ).map(i => ({ ...i, content: undefined, filePath: undefined }));

  const OBMemberList = orderBy(
    memberList.filter(i => i.category === '99_OB'),
    ['year_of_graduation', 'title'],
    ['desc', 'asc'],
  ).map(i => ({ ...i, content: undefined, filePath: undefined }));

  return [
    {
      path: '/',
      component: 'src/containers/Home',
      getProps: () => ({
        page: {
          title: '',
          news: newsList.slice(0, 10).map(i => ({ ...i, content: undefined, filePath: undefined })),
          projects: projectList
            .filter(i => i.visibleOnTopPage)
            .map(i => ({ ...i, date: undefined, content: undefined, filePath: undefined })),
          members: currentMemberList,
        },
      }),
    },
    ...makePageRoutes(newsList.map(i => ({ ...i, content: undefined, filePath: undefined })), 10, {
      path: '/news/',
      component: 'src/containers/NewsList',
    }),
    {
      path: '/members/',
      component: 'src/containers/MemberList',
      getProps: () => ({
        page: {
          title: 'メンバー',
          currentMembers: currentMemberList,
          OBMembers: OBMemberList,
        },
      }),
    },
    {
      path: '/projects/',
      component: 'src/containers/ProjectList',
      getProps: () => ({
        page: {
          title: 'プロジェクト',
          projectsGroupByCategories: projectListGroupByCategories,
        },
      }),
    },
    ...memberList.map(info => ({
      path: info.permalink,
      component: 'src/containers/Member',
      getProps: () => ({ page: info }),
    })),
    ...newsList.map(info => ({
      path: info.permalink,
      component: 'src/containers/News',
      getProps: () => ({ page: info }),
    })),
    ...projectList.map(info => ({
      path: info.permalink,
      component: 'src/containers/Article',
      getProps: () => ({ page: info }),
    })),
    ...othersList.map(info => ({
      path: info.permalink,
      component: 'src/containers/Article',
      getProps: () => ({ page: info }),
    })),
    {
      is404: true,
      component: 'src/containers/NotFound',
    },
  ];
}

export default getRoutes;
