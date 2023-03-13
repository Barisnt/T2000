import { Button, Divider, Input, Layout, theme } from 'antd';
import { Content, Header } from 'antd/es/layout/layout';
import Sider from 'antd/es/layout/Sider';
import { FunctionComponent, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../store';
import { setSearchQueryTerm, ytsSearch } from '../store/ytsSearchSlice';

const SearchScreen: FunctionComponent = () => {
  const {
    token: { colorBgContainer }
  } = theme.useToken();

  const dispatch = useAppDispatch();
  const responseSelector = useAppSelector((store) => store.yts.searchResponse);

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
            style={{ background: colorBgContainer, alignContent: 'flex-start' }}
          >
            <Divider type="horizontal" />
            <Input
              onChange={(e) => {
                dispatch(
                  setSearchQueryTerm(
                    e.target.value === '' ? undefined : e.target.value
                  )
                );
              }}
            />
            <Button
              onClick={() => {
                dispatch(ytsSearch());
              }}
            >
              Search
            </Button>
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
              {responseSelector.movies
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
