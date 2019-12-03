// const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

// export const isValidEmail = (address) => emailRegex.test(address);
// export const isValidPhone = (value: string = ''): boolean => value !== null && ((value).replace(/[^0-9]/g, '').length === 7 || value.replace(/[^0-9]/g, '').length > 9);
// export const isValidDate = (param: any): boolean => (new Date(param || 'invalid')).toString() !== 'Invalid Date' && ((new Date(param)) instanceof Date);

const isValidDate = value => (value instanceof Date) && (value || 'invalid').toString() !== 'Invalid Date';

module.exports = {
    isValidDate,
};