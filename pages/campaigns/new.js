import React, { useState } from 'react';
import { Form, Button, Input, Message } from 'semantic-ui-react';
import web3 from '../../ethereum/web3';
import factory from '../../ethereum/factory';

import { useRouter } from 'next/router';

const CampaignNew = () => {
  const [minimumContribution, setMinimumContribution] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const onSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setErrorMessage('');

    try {
      const accounts = await web3.eth.getAccounts();
      await factory.methods.createCampaign(minimumContribution).send({
        from: accounts[0],
      });
      setLoading(false);
      router.push('/');
    } catch (err) {
      setErrorMessage(err.message);
      setLoading(false);
    }
  };

  return (
    <>
      <h3>Create a campaign</h3>

      <Form onSubmit={onSubmit} error={!!errorMessage}>
        <Form.Field>
          <label htmlFor=''>Minimum Contribution</label>
          <Input
            label='wei'
            labelPosition='right'
            value={minimumContribution}
            onChange={(e) => setMinimumContribution(e.target.value)}
          />
          <Message error header='Oops!' content={errorMessage} />
          <Button loading={loading} primary>
            Submit
          </Button>
        </Form.Field>
      </Form>
    </>
  );
};

export default CampaignNew;
