import React from 'react';
import { useQuery } from '@apollo/client';
import { listRepositories } from '../GraphQL/Queries';
import { Spin,Table, Button } from 'antd';
import { Link, useNavigate } from 'react-router-dom';

function GetRepoList() {
  const navigate = useNavigate();
  const { loading, error, data } = useQuery(listRepositories);
  if (loading) return <Spin size="large" />;
  if (error) return <p>Error: {error.message}</p>;

  const repositories = data.listRepositories;

  const handleViewClick = (repository) => {
    const repoName = repository.owner+'/'+repository.name;
    navigate(`/repo/${repoName}`);
  };

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Owner',
      dataIndex: 'owner',
      key: 'owner',
    },
    {
      title: 'Size',
      dataIndex: 'size',
      key: 'size',
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, repository) => (
        <Link to={`/repo/${repository.owner}/${repository.name}`}>
          <Button onClick={() => handleViewClick(repository)}>View</Button>
        </Link>
      ),
    },
  ];

  return (
    <div>
      <h1>List of Repositories</h1>
      <Table dataSource={repositories} columns={columns} rowKey="name" />
    </div>
  );
}

export default GetRepoList;
