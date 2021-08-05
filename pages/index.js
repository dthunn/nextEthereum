import Link from 'next/link';
import factory from '../ethereum/factory';
import { Card, Button } from 'semantic-ui-react';
import { useRouter } from 'next/router';

const index = ({ campaigns }) => {
  const router = useRouter();

  const renderCampaings = () => {
    const items = campaigns.map((address) => {
      return {
        header: address,
        description: <Link href={`/campaigns/${address}`}>View Campaign</Link>,
        fluid: true,
      };
    });
    return <Card.Group items={items} />;
  };

  return (
    <>
      <Button
        floated='right'
        content='Create Campaign'
        icon='add circle'
        primary
        onClick={() => router.push('/campaigns/new')}
      />
      <div>{renderCampaings()}</div>
    </>
  );
};

export async function getServerSideProps() {
  const campaigns = await factory.methods.getCampaigns().call();

  return {
    props: {
      campaigns,
    },
  };
}

export default index;
