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
                height: '300px'
            },
            titles: this.props.titles,
            sorted: this.props.sorted,
            filter: '',
            defaultInputValue: this.props.defaultInputValue,
        }
    },
    listHandler(){
        let list;
        if (this.state.filter !== ''){
            list = this.props.titles.filter( (title) => {
                if(~title.indexOf(this.state.filter)) return true
            });
        }
        else {
            list = [...this.props.titles];
        }
        if (this.state.sorted){
            list.sort();
        }
        this.setState({titles: list});
    },
    input_onChangeHandler(e){
        this.setState({filter: e.target.value},  this.listHandler)
    },
    checkbox_onChangeHandler(e){
        this.setState({sorted: e.target.checked}, this.listHandler)
    },
    button_onClickHandler(e){
        this.setState({sorted: false, filter: ''}, this.listHandler);
    },
    render(){
        return (
            React.DOM.div({className:'main'},
                React.DOM.input({type: "checkbox", onChange: this.checkbox_onChangeHandler, checked: this.state.sorted}, null),
                React.DOM.input({type: "input", onChange: this.input_onChangeHandler, value: this.state.filter}, null),
                React.DOM.button({onClick: this.button_onClickHandler}, "Reset"),
                React.DOM.select({multiple: true, style: this.state.style},
                    this.state.titles.map( item => React.DOM.option({key: item}, item))
                )
            )
        )
    }
});

