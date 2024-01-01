import React from 'react';
import { Button, Result } from 'antd';
import { Link } from 'react-router-dom';

const Page_404: React.FC = () => (
  <Result
    status="404"
    title="404"
    subTitle="Sorry, the page you visited does not exist."
    extra={<Link to={'/home'}><Button type="primary" size='large'>Back Home</Button></Link>}
  />
);

export default Page_404;
