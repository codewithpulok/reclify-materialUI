import PropTypes from 'prop-types';
import { DocumentsPreviewList } from 'src/components/common/custom-fields';
import { EmptyState } from 'src/components/common/custom-state';
import { WarehouseDetailsBox } from 'src/components/warehouse/box';

const Props = {
  /** @type {Photo[]} */
  documents: PropTypes.array,
  /** @type {SxProps} */
  sx: PropTypes.object,
};

/**
 * @param {Props} props
 * @returns {JSX.Element}
 */
const WarehouseDocumentList = (props) => {
  const { sx, documents } = props;
  return (
    <WarehouseDetailsBox sx={sx} title="Documents">
      {!!documents?.length && <DocumentsPreviewList downloadAble documents={documents} />}
      {!documents?.length && <EmptyState />}
    </WarehouseDetailsBox>
  );
};

WarehouseDocumentList.propTypes = Props;

export default WarehouseDocumentList;
