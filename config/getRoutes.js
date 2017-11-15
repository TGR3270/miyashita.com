import path from 'path';
import orderBy from 'lodash.orderby';
import getArticleList from './utils/getArticleList';

const filePaths = {
  news: path.resolve(__dirname, '../articles/news/**/*.md'),
  projects: path.resolve(__dirname, '../articles/projects/**/*.md'),
  members: path.resolve(__dirname, '../articles/members/**/*.md'),
  others: path.resolve(__dirname, '../articles/others/**/*.md'),
};

async function getRoutes() {
  const newsList = await getArticleList(filePaths.news, {
    permalink: 'https://news.miyashita.com/:year/:month/:day/:title/',
  });
  const projectList = await getArticleList(filePaths.projects, { permalink: '/projects/:title/' });
  const memberList = await getArticleList(filePaths.members, { permalink: '/members/:title/' });
  const othersList = await getArticleList(filePaths.others);

  const projectCategories = Array.from(new Set(projectList.map(p => p.category)));
  const projectListGroupByCategories = {};
  for (const category of projectCategories) {
    projectListGroupByCategories[category] = projectList
      .filter(p => p.category === category)
      .map(i => ({ ...i, date: null, content: null }));
  }

  const currentMemberList = orderBy(
    memberList.filter(i => i.category !== '99_OB'),
    ['category', 'school_year', 'title'],
    ['asc', 'desc', 'asc'],
  ).map(i => ({ ...i, content: null }));
  const OBMemberList = orderBy(
    memberList.filter(i => i.category === '99_OB'),
    ['year_of_graduation', 'title'],
    ['desc', 'asc'],
  ).map(i => ({ ...i, content: null }));

  return [
    {
      path: '/',
      component: 'src/containers/Home',
      getProps: () => ({
        news: newsList.slice(0, 10).map(i => ({ ...i, content: null })),
        projects: projectList
          .filter(i => i.visibleOnTopPage)
          .map(i => ({ ...i, date: null, content: null })),
        members: currentMemberList,
      }),
    },
    {
      path: '/members',
      component: 'src/containers/MemberList',
      getProps: () => ({
        currentMembers: currentMemberList,
        OBMembers: OBMemberList,
      }),
    },
    {
      path: '/projects',
      component: 'src/containers/ProjectList',
      getProps: () => ({
        projectsGroupByCategories: projectListGroupByCategories,
      }),
    },
    ...memberList.map(info => ({
      path: info.permalink,
      component: 'src/containers/Member',
      getProps: () => ({ member: info }),
    })),
    ...projectList.map(info => ({
      path: info.permalink,
      component: 'src/containers/Article',
      getProps: () => ({ article: info }),
    })),
    ...othersList.map(info => ({
      path: info.permalink,
      component: 'src/containers/Article',
      getProps: () => ({ article: info }),
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
