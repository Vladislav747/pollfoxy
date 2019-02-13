export function checkUri(UrlForCheck) {
    if (UrlForCheck === "localhost:3000") {
        uriCorrect = "http://localhost:3000/poll";
        return uriCorrect;
    } else if (UrlForCheck === "pollfoxy.herokuapp.com") {
        uriCorrect = "https://pollfoxy.herokuapp.com/poll";
        return uriCorrect;
    }
}