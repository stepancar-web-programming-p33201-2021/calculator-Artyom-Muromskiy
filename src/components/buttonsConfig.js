export const BTN_ACTIONS = {
    ADD: 'add',
    MEMORY: 'memory',
    OP: 'op',
    CALC: 'calc',
    DELETE: 'delete',
    NONE: 'none'
}

export const ops = {
    '+': (a, b) => a + b,
    '-': (a, b) => a - b,
    '*': (a, b) => a * b,
    '%': (a, b) => a / b,
    '/': (a, b) => a/ b,
    '^': (a, b) => Math.pow(a, b)
}

export const specialKeys = ['Enter', 'Backspace']
export const nums = /[0-9.]/;
export const operations = /[+\-/*%^=]/;

export const btns = [
    {
        display: 'M+',
        action: BTN_ACTIONS.MEMORY
    },
    {
        display: 'M-',
        action: BTN_ACTIONS.MEMORY
    },
    {
        display: 'x^y',
        action: BTN_ACTIONS.OP
    },
    {
        display: 'clear',
        action: BTN_ACTIONS.DELETE
    },
    {
        display: 'AC',
        action: BTN_ACTIONS.DELETE
    },
    {
        display: '1',
        action: BTN_ACTIONS.ADD
    },
    {
        display: '2',
        action: BTN_ACTIONS.ADD
    },
    {
        display: '3',
        action: BTN_ACTIONS.ADD
    },
    {
        display: '+',
        action: BTN_ACTIONS.OP
    },
    {
        display: 'MR',
        action: BTN_ACTIONS.MEMORY
    },
    {
        display: '4',
        action: BTN_ACTIONS.ADD
    },
    {
        display: '5',
        action: BTN_ACTIONS.ADD
    },
    {
        display: '6',
        action: BTN_ACTIONS.ADD
    },
    {
        display: '-',
        action: BTN_ACTIONS.OP
    },
    {
        display: '',
        action: BTN_ACTIONS.NONE
    },
    {
        display: '7',
        action: BTN_ACTIONS.ADD
    },
    {
        display: '8',
        action: BTN_ACTIONS.ADD
    },
    {
        display: '9',
        action: BTN_ACTIONS.ADD
    },
    {
        display: '*',
        action: BTN_ACTIONS.OP
    },
    {
        display: '',
        action: BTN_ACTIONS.NONE
    },
    {
        display: '.',
        action: BTN_ACTIONS.ADD
    },
    {
        display: '0',
        action: BTN_ACTIONS.ADD
    },
    {
        display: '=',
        action: BTN_ACTIONS.CALC
    },
    {
        display: '%',
        action: BTN_ACTIONS.OP
    },
    {
        display: '',
        action: BTN_ACTIONS.NONE
    },
]