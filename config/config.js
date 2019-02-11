var baseurl = function(req, res, next) {
    var url = req.get('host');
    console.log(url)
    return url
}

module.exports = baseurl