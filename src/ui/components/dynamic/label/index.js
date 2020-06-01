import { connect } from "react-redux";
import { selectors } from "../../../ducks";
import view from "./index.jsx";

const mapStateToProps = (state, ownProps) => ({
	getWordById:(id) => selectors.languages.getWordById(state,id)
});


export default connect(
	mapStateToProps	
)(view);
