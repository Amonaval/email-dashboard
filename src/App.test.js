import React from 'react';
import ReactDOM from 'react-dom';
import {mount} from 'enzyme';
import {expect} from 'chai';
import {Provider} from 'react-redux';
import {IntlProvider} from 'react-intl';
import MailBoard from './components/MailBoard';
import mailsMock from './mock/mailsMock';

export function tests() {
	describe('Main App', () => {
        context('when instantiated with general props', () => {
        	const props = {
        		mailsMock
        	}
        	const MailBoardWrapper = mount(
                <Provider store={store}>
                    <IntlProvider locale="en">
                        <MailBoard {...props} />
                    </IntlProvider>
                </Provider>);

        	it('it should contain wrapper element', () => {
                expect(MailBoardWrapper.length).equal(1);
            });

        });
    });
}

export default tests();