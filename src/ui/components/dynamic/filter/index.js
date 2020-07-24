import { actions, selectors } from "../../../ducks";
import { connect } from "react-redux";
import view from './index.jsx';


const mapStateToProps = (state) => ({
  searchDropdownData: selectors.orders.getDropdownData(state),
  filterBarData: selectors.orders.getFilterBarData(state)
});

const mapDispatchToProps = dispatch => ({
  setFilterBarData: (data) => dispatch(actions.orders.setSearchFilterBarData(data)),
  clearFilterBarData: (type) => dispatch(actions.orders.clearSearchFilterBarData(type)),
  clearAllFilterBarData: () => dispatch(actions.orders.clearAllSearchFilterBarData()),
  clearDropdownData: (type) => dispatch(actions.orders.clearDropdownData(type)),
});

export default connect(mapStateToProps, mapDispatchToProps)(view);
