const Filter = React.createClass({
    displayName: 'filter',
    propsTypes: {
        name: React.PropTypes.string,
        titles: React.PropTypes.array,
        filtered: React.PropTypes.bool,
        defaultInputValue: React.PropTypes.string,
    },
    getInitialState(){
        return {
            style: {
                display: 'block',
                width: '230px',
                margin: '10px',
            },
            titles: this.props.titles,
            default: [...this.props.titles],
            prev: [...this.props.titles],
            filtered: this.props.filtered,
            buffer: [],
            defaultInputValue: this.props.defaultInputValue,
        }
    },
    input_onChangeHandler(e){
        this.setState({titles: this.state.prev.filter( (title) => {
            if (~title.indexOf(e.target.value)) return true;
        }),
            filtered: this.state.filtered ? !this.state.filtered : false,
        });
    },
    checkbox_onChangeHandler(e){
        let buff = this.state.titles;
        !this.state.filtered
            ? this.setState({
                filtered: !this.state.filtered,
                titles: [].concat(this.state.titles).sort(),
                buffer: buff,
            })
            : this.setState({
                filtered: !this.state.filtered,
                titles: this.state.buffer,
            });
    },
    button_onClickHandler(e){
        this.setState({titles: this.state.default, filtered: this.props.filtered, defaultInputValue: 'sd'});
        e.target.previousSibling.value = '';
    },
    render(){
        const titles = this.state.titles;
        this.displayName = this.props.name;
        return (
            React.DOM.div({className:'main'},
                React.DOM.input({type: "checkbox", onChange: this.checkbox_onChangeHandler, checked: this.state.filtered}, null),
                React.DOM.input({type: "input", onChange: this.input_onChangeHandler, defaultValue: this.state.defaultInputValue}, null),
                React.DOM.button({onClick: this.button_onClickHandler}, "Reset"),
                React.DOM.select({multiple: true, style: this.state.style},
                    titles.map( item => React.DOM.option({key: item}, item))
                )
            )
        )
    }
});

