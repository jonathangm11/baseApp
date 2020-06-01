import { connect } from "react-redux";
import { selectors ,actions} from "../../../ducks";
import view from "./index.jsx";

const mapStateToProps = (state, ownProps) => ({
	languages: selectors.languages.getLanguagesList(state),
	language:selectors.languages.getLanguage(state)
});

const mapDispatchToProps = (dispatch, state, props) => ({
    getLanguages: () =>  dispatch(actions.languages.getLanguagesList()),
    setLanguage: (l) =>  dispatch(actions.languages.setLanguage({language:l,cacheable:true}))
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(view);

	
