const setHeader = (res, statusCode) => {
    res.set({
        "Cache-Control": "no-store"
    })
    res.status(statusCode)
}

module.exports = {
    setHeader
}