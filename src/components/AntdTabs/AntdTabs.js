import React from 'react';
import {Tabs} from 'antd'

const AntdTabs = ({author,setAuthor}) => {

    const { TabPane } = Tabs;

    return (
        <Tabs
            centered
            activeKey={author}
            onChange={(activeKey) => setAuthor(activeKey)}
        >
            <TabPane key={"register"} tab={"Register"} />
            <TabPane key={"login"} tab={"Login"} />
        </Tabs>
    );
};

export default AntdTabs;