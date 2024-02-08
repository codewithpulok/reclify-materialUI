import PropTypes from 'prop-types';
import { FormProvider as Form } from 'react-hook-form';

const Props = {
  children: PropTypes.node,
  methods: PropTypes.object,
  onSubmit: PropTypes.func,
  onReset: PropTypes.func,
};
// ----------------------------------------------------------------------

/**
 * @param {Props} props
 * @returns {JSX.Element}
 */
export default function FormProvider(props) {
  const { children, methods, onSubmit = () => {}, onReset = () => {} } = props;
  return (
    <Form {...methods}>
      <form
        onSubmit={(e) => {
          e.stopPropagation(); // prevent to parent form call
          onSubmit(e);
        }}
        onReset={(e) => {
          e.stopPropagation(); // prevent to parent form call
          onReset(e);
        }}
      >
        {children}
      </form>
    </Form>
  );
}

FormProvider.propTypes = Props;
