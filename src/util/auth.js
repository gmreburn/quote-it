const REDIRECT_URL =
	"https://12d89ac9b7b8e7cfef393b3a1d101555db9f0fed.extensions.allizom.org/";
const CLIENT_ID = "3on50or2vn1bpbautrisvepdei";
const SCOPES = ["openid", "email", "profile"];
const AUTH_URL = `https://auth.wittingly.net/oauth2/authorize\
?client_id=${CLIENT_ID}\
&response_type=token\
&scope=${encodeURIComponent(SCOPES.join(" "))}\
&redirect_uri=${encodeURIComponent(REDIRECT_URL)}`;

function getAccessToken(interactive = true) {
	return browser.identity
		.launchWebAuthFlow({
			url: AUTH_URL,
			interactive,
		})
		.then(extractAccessToken);
}

function extractAccessToken(redirectUri) {
	let m = redirectUri.match(/[#?](.*)/);
	if (!m || m.length < 1) return null;
	let params = new URLSearchParams(m[1].split("#")[0]);
	console.log(JSON.stringify(params));
	return params.get("access_token");
}

export default getAccessToken;

// TODO: see oauth example from web-ext docs, add verify step
