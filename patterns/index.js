const patternDict = [
    {
        pattern :'.*[Ww]atch\\s(?<moviename>(\\w|\\s?)*)',
        intent : "Watch Movie"
    },
    {
        pattern :'\\b[Ll]isten\\s(?<music>.+)by\\s(?<author>[\\w|\\s]+)',
        intent : "Listen music"
    },
    {
        pattern :'\\b(bye|exit)\\b',
        intent : "exit"
    },
    {
        pattern:'\\b(?<state>rainy|sunny|cloudy|fogy|cold|hot|)\\s+in\\s(?<city>.+)(?<time>tomorrow|today|yesterday)',
        intent: 'ComplexWeather'
    },
    {
        pattern:'\\b(weather|time) in (?<city>[\\w|\\s]+)',
        intent: 'SimpleWeather'
    }
    

];
module.exports = patternDict;