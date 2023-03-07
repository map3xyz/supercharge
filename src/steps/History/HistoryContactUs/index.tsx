import { Badge, Button, Input, Radio, Textarea } from '@map3xyz/components';
import { motion } from 'framer-motion';
import React, { useContext, useState } from 'react';

import InnerWrapper from '../../../components/InnerWrapper';
import { Context } from '../../../providers/Store';

const HistoryContactUs: React.FC<Props> = ({ setShowContactUs }) => {
  const [state] = useContext(Context);
  const [formValue, setFormValue] = useState<FormData>();
  const [formError, setFormError] = useState<string | null>(null);
  const [formSuccess, setFormSuccess] = useState<boolean>(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    setFormError(null);
    e.preventDefault();

    setLoading(true);

    try {
      const result = await fetch(`${process.env.CONSOLE_API_URL}/contact-us`, {
        body: JSON.stringify({
          email: formValue?.get('email'),
          issue: formValue?.get('issue'),
          message: formValue?.get('message'),
          orderId: formValue?.get('order-id'),
          userId: state.userId,
        }),
        headers: {
          authorization: `Bearer ${state.anonKey}`,
        },
        method: 'POST',
      });

      const json = await result.json();
      if (!result.ok) {
        throw new Error(json?.message || 'Something went wrong.');
      }
      setFormSuccess(true);
    } catch (error: any) {
      console.error(error);
      setFormError(error?.message || 'Something went wrong.');
    } finally {
      setLoading(false);

      setTimeout(() => {
        setFormSuccess(false);
      }, 2000);
    }
  };

  return (
    <motion.div
      animate={{ transform: 'translateY(0%)' }}
      className="layout-scrollbar absolute z-10 h-full w-full bg-white dark:bg-primary-900"
      exit={{ opacity: 0, transform: 'translateY(100%)' }}
      initial={{ transform: 'translateY(100%)' }}
      transition={{ duration: 0.5, type: 'spring' }}
    >
      <InnerWrapper className="h-full w-full">
        <form
          className="flex h-full w-full flex-col justify-between"
          onChange={(e) => {
            setFormError(null);
            setFormValue(new FormData(e.currentTarget));
          }}
          onSubmit={handleSubmit}
        >
          <div className="flex h-full flex-col gap-2">
            <div>
              <label className="mb-1 block text-xs text-primary-400">
                What can we help you with?
              </label>
              <Radio
                label="My deposit is stuck as pending."
                name="issue"
                value="pending"
              />
              <Radio
                label="I don't see my deposit."
                name="issue"
                value="no-deposit"
              />
              <Radio label="My deposit failed." name="issue" value="failed" />
            </div>
            <Input label="Email Address" name="email" required type="email" />
            <Input label="Order ID" name="order-id" required type="text" />
            <Textarea
              label="Message"
              name="message"
              style={{ resize: 'none' }}
            />
          </div>
          <div className="flex flex-col gap-2 text-center">
            {formError ? (
              <div className="mt-2">
                <Badge color="red">{formError}</Badge>
              </div>
            ) : null}
            {formSuccess ? (
              <div className="mt-2">
                <Badge color="green">
                  Message sent. We will contact you soon.
                </Badge>
              </div>
            ) : (
              <Button
                block
                disabled={loading}
                htmlType="submit"
                loading={loading}
              >
                Submit
              </Button>
            )}
            <span
              className="text-xs text-primary-400"
              onClick={() => setShowContactUs(false)}
              role="button"
            >
              Cancel
            </span>
          </div>
        </form>
      </InnerWrapper>
    </motion.div>
  );
};

type Props = {
  setShowContactUs: React.Dispatch<React.SetStateAction<boolean>>;
};

export default HistoryContactUs;
