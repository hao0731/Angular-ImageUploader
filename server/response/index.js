const Message = (message) => {
    return { message: message }
}

const send = (res, status, content) => {
    res.status(status)
    res.json(content)
}

module.exports = { Message, send }