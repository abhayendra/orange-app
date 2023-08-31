import React from 'react';
import { useQuery } from '@apollo/client';
import { useParams } from 'react-router-dom'; 
import { repoDetail } from '../GraphQL/Queries';
import { Spin, Card, List } from 'antd';

function RepoDetail() {
  // Get the repository name from the URL params
   const { owner , repoName } = useParams();
   const  name  = `${owner}/${repoName}`;
   console.log(name)
  // Use Apollo Client to send the query
  const { loading, error, data } = useQuery(repoDetail, {
    variables: { name },
  });
  if (loading) return <Spin size="large" />; 
  if (error) return <p>Error: {error.message}</p>;

  const repoDetails = data.repoDetails;
 
  return (
    <div>
      <h2>Repository Detail</h2>
      <Card title="Repository Information">
        <p><strong>Name:</strong> {repoDetails.name}</p>
        <p><strong>Number of Files:</strong> {repoDetails.numberOfFiles}</p>
        <p><strong>Owner:</strong> {repoDetails.owner}</p>
        <p><strong>Size:</strong> {repoDetails.size}</p>
        <p><strong>Private Repo:</strong> {repoDetails.isPrivate ? 'Yes' : 'No'}</p>
      </Card>
      <Card title="Active Webhooks">
        <List
          dataSource={repoDetails.activeWebhooks}
          renderItem={webhook => (
            <List.Item>
              <p><strong>Id:</strong> {webhook.id}</p>  
              <p><strong>Name:</strong> {webhook.name}</p>
              <p><strong>Type:</strong> {webhook.type}</p>
              <p><strong>Active:</strong> {webhook.active ? 'Yes' : 'No'}</p>
            </List.Item>
          )}
        />
      </Card>
    </div>
  );
}
export default RepoDetail;