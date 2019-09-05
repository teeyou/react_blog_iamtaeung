import React, { Component } from 'react'

export default class Search extends Component {

    render() {
        return (
            <div>
                <div className="field" style={{ display: "flex", flexDirection: "column", alignItems: "flex-end" }}>
                    <div className="control">
                        <input
                            style={{ marginTop: "40px" }}
                            className="input is-info"
                            type="text"
                            value={this.props.searchText}
                            placeholder="검색어 입력"
                            onChange={this.props.searchChangeHandler} />
                    </div>
                </div>

                <div className="button-container"
                    style={{ textAlign: "right", marginBottom: "75px" }}>
                    <button
                        style={{ marginRight: "10px" }}
                        className="button is-info is-outlined"
                        onClick={this.props.contentsClickHandler}>Contents
                    </button>
                    <button
                        style={{ marginRight: "10px" }}
                        className="button is-primary is-outlined"
                        onClick={this.props.dateClickHandler}>Date
                    </button>
                </div>
            </div>
        )
    }
}