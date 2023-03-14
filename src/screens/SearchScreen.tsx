import {
  Button,
  Checkbox,
  Divider,
  Input,
  Layout,
  Select,
  Space,
  Spin,
  Switch,
  theme
} from 'antd';
import { Content, Header } from 'antd/es/layout/layout';
import Sider from 'antd/es/layout/Sider';
import { FunctionComponent, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../store';
import {
  IYTSSearchState,
  setSearchIsWithRtRatings,
  setSearchMinimumRating,
  setSearchOrderBy,
  setSearchQuality,
  setSearchQueryTerm,
  setSearchSortBy,
  ytsSearch
} from '../store/ytsSearchSlice';

const SearchScreen: FunctionComponent = () => {
  const {
    token: { colorBgContainer }
  } = theme.useToken();

  const dispatch = useAppDispatch();
  const responseSelector = useAppSelector((store) => store.yts.searchResponse);
  const isLoadingSelector = useAppSelector((store) => store.yts.isLoading);
  useEffect(() => {
    console.log('res', responseSelector);
  }, [responseSelector]);

  return (
    <>
      <Layout>
        <Header className="header">
          <div className="logo" />
        </Header>
        <Layout>
          <Sider
            width={200}
            style={{
              background: colorBgContainer,
              alignContent: 'flex-start',
              padding: 8
            }}
          >
            <Space direction="vertical">
              <Divider type="horizontal">Search</Divider>
              <Input
                onChange={(e) => {
                  dispatch(
                    setSearchQueryTerm(
                      e.target.value === '' ? undefined : e.target.value
                    )
                  );
                }}
              />

              <Divider type="horizontal">Quality</Divider>
              <Select
                placeholder={'All'}
                allowClear
                style={{ width: '100%' }}
                defaultValue={undefined}
                onChange={(value: IYTSSearchState['quality']) => {
                  dispatch(setSearchQuality(value));
                }}
                options={[
                  { value: '720p', label: '720p' },
                  { value: '1080p', label: '1080p' },
                  { value: '3d', label: '3D' },
                  { value: '2160p', label: '2160p' }
                ]}
              />
              <Divider type="horizontal">Minimum Rating</Divider>
              <Select
                placeholder={'All'}
                allowClear
                style={{ width: '100%' }}
                defaultValue={undefined}
                onChange={(value: IYTSSearchState['minimum_rating']) => {
                  dispatch(setSearchMinimumRating(value));
                }}
                options={[...Array(10).keys()].map((rate) => {
                  return {
                    value: rate,
                    label: rate
                  };
                })}
              />
              <Divider type="horizontal">Sort By</Divider>
              <Select
                placeholder={'All'}
                allowClear
                style={{ width: '100%' }}
                defaultValue={undefined}
                onChange={(value: IYTSSearchState['sort_by']) => {
                  dispatch(setSearchSortBy(value));
                }}
                options={[
                  {
                    value: 'title',
                    label: 'Title'
                  },
                  {
                    value: 'year',
                    label: 'Year'
                  },
                  {
                    value: 'rating',
                    label: 'Rating'
                  },
                  {
                    value: 'peers',
                    label: 'Peers'
                  },
                  {
                    value: 'seeds',
                    label: 'Seeds'
                  },
                  {
                    value: 'download_count',
                    label: 'Download count'
                  },
                  {
                    value: 'like_count',
                    label: 'Like count'
                  },
                  {
                    value: 'date_added',
                    label: 'Date added'
                  }
                ]}
              />

              <Divider type="horizontal">Miscellaneous</Divider>
              <Switch
                style={{ width: '100%' }}
                checkedChildren="Descending"
                unCheckedChildren="Ascending"
                defaultChecked
                onChange={(value) => {
                  dispatch(setSearchOrderBy(!value ? 'asc' : 'desc'));
                }}
              />
              <Checkbox
                onChange={(e) => {
                  dispatch(setSearchIsWithRtRatings(e.target.checked));
                }}
              >
                With Rotten Tomatoes Ratings
              </Checkbox>
              <Button
                type="text"
                style={{
                  width: '100%',
                  marginTop: 16,
                  backgroundColor: 'green',
                  color: 'white'
                }}
                onClick={() => {
                  dispatch(ytsSearch());
                }}
              >
                Search
              </Button>
            </Space>
          </Sider>
          <Layout style={{ padding: '0 24px 24px' }}>
            <Divider type="horizontal" />
            <Content
              style={{
                padding: 24,
                margin: 0,
                minHeight: 280,
                background: colorBgContainer
              }}
            >
              {isLoadingSelector && <Spin />}

              {!isLoadingSelector &&
                responseSelector.movies
                  .map((movie) => {
                    return movie.title;
                  })
                  .join(' | ')}
            </Content>
          </Layout>
        </Layout>
      </Layout>
    </>
  );
};

export default SearchScreen;
