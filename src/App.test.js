import React from "react";
import { render, fireEvent, waitForElement } from "@testing-library/react";
import 'mutationobserver-shim';

import ContactForm from './components/ContactForm';

test("cannot submit an empty form: must fail this test", () => {
    const { getByTestId } = render(<ContactForm />);
    fireEvent.click(getByTestId('submit button'))
    getByTestId('submitted data')
});
test("fields are rendered", () => {
    const { getByTestId } = render(<ContactForm />)
    getByTestId('first name')
    getByTestId('last name')
    getByTestId('email')
    getByTestId('message')
})
test("can type in fields", () => {
    const { getByTestId } = render(<ContactForm />)
    const firstnameInput = getByTestId('first name')
    const lastnameInput = getByTestId('last name')
    const emailInput = getByTestId('email')
    const messageInput = getByTestId('message')
    
    fireEvent.change(firstnameInput, { target: { value: 'Billy' } })
    expect(firstnameInput.value).toBe('Billy')
    fireEvent.change(lastnameInput, { target: {value: 'Johnson' } })
    expect(lastnameInput.value).toBe('Johnson')
    fireEvent.change(emailInput, { target: { value: 'testingemail@email.com' } })
    expect(emailInput.value).toBe('testingemail@email.com')
    fireEvent.change(messageInput, { target: { value: 'this is a test message' } })
    expect(messageInput.value).toBe('this is a test message')
})
test("can submit filled form", async () => {
    const { getByTestId } = render(<ContactForm />)
     
    const firstnameInput = getByTestId('first name')
    const lastnameInput = getByTestId('last name')
    const emailInput = getByTestId('email')
    const messageInput = getByTestId('message')
    
    fireEvent.change(firstnameInput, { target: { value: 'Bo' } })  //only works because first name is shorter than 3 characters.
    fireEvent.change(lastnameInput, { target: {value: 'Johnson' } })
    fireEvent.change(emailInput, { target: { value: 'testingemail@email.com' } })
    fireEvent.change(messageInput, { target: { value: 'this is a test message' } })
    
    fireEvent.click(getByTestId('submit button'))
    await waitForElement(() => getByTestId('submitted data'))
})
