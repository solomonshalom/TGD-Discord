// ==UserScript==
// @name            TGD-Discord
// @description     Delete all messages in a Discord channel or DM (Bulk deletion)
// @version         7.0.0
// @author          Solomon Shalom Lijo
// @homepageURL     https://github.com/solomonshalom/TGD-Discord
// @supportURL      https://github.com/solomonshalom/TGD-Discord/issues
// @match           https://*.discord.com/app
// @match           https://*.discord.com/channels/*
// @match           https://*.discord.com/login
// @license         MIT
// @namespace       https://github.com/solomonshalom/TGD-Discord
// @contributionURL https://ko-fi.com/solomonlijo
// @grant           none
// ==/UserScript==
(function () {
  'use strict';
 
  var version = "5.0.2";
 
  var discordStyles = (`
/* tgddiscord window */
#tgddiscord.browser {
    box-shadow: var(--elevation-stroke), var(--elevation-high);
    overflow: hidden;
}
 
#tgddiscord.container,
#tgddiscord .container {
    background-color: var(--background-secondary);
    border-radius: 8px;
    box-sizing: border-box;
    cursor: default;
    flex-direction: column;
}
 
#tgddiscord .header {
    background-color: var(--background-tertiary);
    height: 48px;
    align-items: center;
    min-height: 48px;
    padding: 0 16px;
    display: flex;
    color: var(--header-secondary);
}
 
#tgddiscord .header .icon {
    color: var(--interactive-normal);
    margin-right: 8px;
    flex-shrink: 0;
    width: 24;
    height: 24;
}
 
#tgddiscord .header .icon:hover {
    color: var(--interactive-hover);
}
 
#tgddiscord .header h3 {
    font-size: 16px;
    line-height: 20px;
    font-weight: 500;
    font-family: var(--font-display);
    color: var(--header-primary);
    flex-shrink: 0;
    margin-right: 16px;
}
 
#tgddiscord .header .spacer {
    flex-grow: 1;
}
 
#tgddiscord .header .vert-divider {
    width: 1px;
    height: 24px;
    background-color: var(--background-modifier-accent);
    margin-right: 16px;
    flex-shrink: 0;
}
 
#tgddiscord legend,
#tgddiscord label {
    display: block;
    width: 100%;
    color: var(--header-secondary);
    font-size: 12px;
    line-height: 16px;
    font-weight: 500;
    text-transform: uppercase;
    cursor: default;
    font-family: var(--font-display);
    margin-bottom: 8px;
}
 
#tgddiscord .multiInput {
    display: flex;
    align-items: center;
    font-size: 16px;
    box-sizing: border-box;
    width: 100%;
    border-radius: 3px;
    color: var(--text-normal);
    background-color: var(--input-background);
    border: none;
    transition: border-color 0.2s ease-in-out 0s;
}
 
#tgddiscord .multiInput :first-child {
    flex-grow: 1;
}
 
#tgddiscord .multiInput button:last-child {
    margin-right: 4px;
}
 
#tgddiscord .input {
    font-size: 16px;
    box-sizing: border-box;
    width: 100%;
    border-radius: 3px;
    color: var(--text-normal);
    background-color: var(--input-background);
    border: none;
    transition: border-color 0.2s ease-in-out 0s;
 
    padding: 10px;
    height: 40px;
}
 
#tgddiscord fieldset {
    margin-top: 16px;
}
 
#tgddiscord .input-wrapper {
    display: flex;
    align-items: center;
    font-size: 16px;
    box-sizing: border-box;
    width: 100%;
    border-radius: 3px;
    color: var(--text-normal);
    background-color: var(--input-background);
    border: none;
    transition: border-color 0.2s ease-in-out 0s;
}
 
#tgddiscord input[type="text"],
#tgddiscord input[type="search"],
#tgddiscord input[type="password"],
#tgddiscord input[type="datetime-local"],
#tgddiscord input[type="number"] {
    font-size: 16px;
    box-sizing: border-box;
    width: 100%;
    border-radius: 3px;
    color: var(--text-normal);
    background-color: var(--input-background);
    border: none;
    transition: border-color 0.2s ease-in-out 0s;
    padding: 10px;
    height: 40px;
}
 
#tgddiscord .divider,
#tgddiscord hr {
    border: none;
    margin-bottom: 24px;
    padding-bottom: 4px;
    border-bottom: 1px solid var(--background-modifier-accent);
}
 
#tgddiscord .sectionDescription {
    margin-bottom: 16px;
    color: var(--header-secondary);
    font-size: 14px;
    line-height: 20px;
    font-weight: 400;
}
 
#tgddiscord a {
    color: var(--text-link);
    text-decoration: none;
}
 
#tgddiscord .btn,
#tgddiscord button {
    position: relative;
    display: flex;
    -webkit-box-pack: center;
    justify-content: center;
    -webkit-box-align: center;
    align-items: center;
    box-sizing: border-box;
    background: none;
    border: none;
    border-radius: 3px;
    font-size: 14px;
    font-weight: 500;
    line-height: 16px;
    padding: 2px 16px;
    user-select: none;
 
    /* sizeSmall */
    width: 60px;
    height: 32px;
    min-width: 60px;
    min-height: 32px;
 
    /* lookFilled colorPrimary */
    color: rgb(255, 255, 255);
    background-color: var(--button-secondary-background);
}
 
#tgddiscord .sizeMedium {
    width: 96px;
    height: 38px;
    min-width: 96px;
    min-height: 38px;
}
 
/* lookFilled colorPrimary */
#tgddiscord .accent {
    background-color: var(--brand-experiment);
}
 
#tgddiscord .danger {
    background-color: var(--button-danger-background);
}
 
#tgddiscord .positive {
    background-color: var(--button-positive-background);
}
 
 
#tgddiscord .info {
    font-size: 12px;
    line-height: 16px;
    padding: 8px 10px;
    color: var(--text-muted);
}
 
/* Scrollbar */
#tgddiscord .scroll::-webkit-scrollbar {
    width: 8px;
    height: 8px;
}
 
#tgddiscord .scroll::-webkit-scrollbar-corner {
    background-color: transparent;
}
 
#tgddiscord .scroll::-webkit-scrollbar-thumb {
    background-clip: padding-box;
    border: 2px solid transparent;
    border-radius: 4px;
    background-color: var(--scrollbar-thin-thumb);
    min-height: 40px;
}
 
#tgddiscord .scroll::-webkit-scrollbar-track {
    border-color: var(--scrollbar-thin-track);
    background-color: var(--scrollbar-thin-track);
    border: 2px solid var(--scrollbar-thin-track);
}
 
/* fade scrollbar */
#tgddiscord .scroll::-webkit-scrollbar-thumb,
#tgddiscord .scroll::-webkit-scrollbar-track {
    visibility: hidden;
}
 
#tgddiscord .scroll:hover::-webkit-scrollbar-thumb,
#tgddiscord .scroll:hover::-webkit-scrollbar-track {
    visibility: visible;
}
`);
 
  var tgddiscordStyles = (`
/**** tgddiscord Button ****/
#undicord-btn {
    position: relative;
    width: auto;
    height: 24px;
    margin: 0 8px;
    cursor: pointer;
    color: var(--interactive-normal);
    flex: 0 0 auto;
}
 
#undicord-btn progress {
    position: absolute;
    top: 7px;
    left: 5px;
    width: 14px;
    height: 14px;
}
 
/**** tgddiscord Interface ****/
#tgddiscord {
    position: fixed;
    z-index: 99;
    top: 44px;
    right: 10px;
    display: flex;
    flex-direction: column;
    width: 610px;
    min-width: 610px;
    max-width: 100%;
    height: 448px;
    min-height: 448px;
    max-height: 100%;
    color: var(--text-normal);
    border-radius: 4px;
    background-color: var(--background-secondary);
    box-shadow: var(--elevation-stroke), var(--elevation-high);
    will-change: top, left, width, height;
}
 
#tgddiscord .header .icon {
    cursor: pointer;
}
 
#tgddiscord .window-body {
    height: calc(100% - 48px);
}
 
#tgddiscord .sidebar {
    overflow: hidden scroll;
    overflow-y: auto;
    width: 270px;
    min-width: 250px;
    height: 100%;
    max-height: 100%;
    padding: 8px;
    background: var(--background-secondary);
}
 
#tgddiscord .main {
    display: flex;
    max-width: calc(100% - 250px);
    background-color: var(--background-primary);
    flex-grow: 1;
}
 
#tgddiscord #logArea {
    font-family: Consolas, Liberation Mono, Menlo, Courier, monospace;
    font-size: .75rem;
    overflow: auto;
    padding: 10px;
    user-select: text;
    flex-grow: 1;
    flex-grow: 1;
}
 
#tgddiscord .tbar {
    padding: 8px;
    background-color: var(--background-secondary-alt);
}
 
#tgddiscord .tbar button {
    margin-right: 4px;
    margin-bottom: 4px;
}
 
#tgddiscord .footer {
    cursor: se-resize;
}
 
/**** Elements ****/
 
#tgddiscord summary {
    font-size: 16px;
    font-weight: 500;
    line-height: 20px;
    position: relative;
    overflow: hidden;
    margin-bottom: 2px;
    padding: 6px 10px;
    cursor: pointer;
    white-space: nowrap;
    text-overflow: ellipsis;
    color: var(--interactive-normal);
    border-radius: 4px;
    flex-shrink: 0;
}
 
#tgddiscord fieldset {
    padding-left: 8px;
}
 
/* help link */
#tgddiscord legend a {
    float: right;
    text-transform: initial;
}
 
#tgddiscord progress {
    height: 8px;
    margin-top: 4px;
    flex-grow: 1;
    /* background-color: var(--background-primary);
    border-radius: 3px; */
}
 
/* #tgddiscord progress::-webkit-progress-value{
    background-color: var(--brand-experiment);
} */
 
/**** functional classes ****/
 
#tgddiscord.redact .priv {
    display: none !important;
}
 
#tgddiscord:not(.redact) .mask {
    display: none !important;
}
 
#tgddiscord.redact [priv] {
    -webkit-text-security: disc !important;
}
 
#tgddiscord :disabled {
    display: none;
}
 
/**** layout misc ****/
 
#tgddiscord,
#tgddiscord * {
    box-sizing: border-box;
}
 
#tgddiscord .col {
    display: flex;
    flex-direction: column;
}
 
#tgddiscord .row {
    display: flex;
    flex-direction: row;
    align-items: center;
}
 
#tgddiscord .mb1 {
    margin-bottom: 8px;
}
`);
 
  var buttonHtml = (`
<div id="undicord-btn" tabindex="0" role="button" aria-label="Delete Messages" title="Delete Messages with tgddiscord">
    <svg aria-hidden="false" width="24" height="24" viewBox="0 0 24 24">
        <path fill="currentColor" d="M15 3.999V2H9V3.999H3V5.999H21V3.999H15Z"></path>
        <path fill="currentColor" d="M5 6.99902V18.999C5 20.101 5.897 20.999 7 20.999H17C18.103 20.999 19 20.101 19 18.999V6.99902H5ZM11 17H9V11H11V17ZM15 17H13V11H15V17Z"></path>
    </svg>
    <progress style="display:none;"></progress>
</div>
`);
 
  var tgddiscordTemplate = (`
<div id="tgddiscord" class="browser container redact" style="display:none;">
    <div class="header">
        <svg class="icon" aria-hidden="false" width="24" height="24" viewBox="0 0 24 24">
            <path fill="currentColor" d="M15 3.999V2H9V3.999H3V5.999H21V3.999H15Z"></path>
            <path fill="currentColor"
                d="M5 6.99902V18.999C5 20.101 5.897 20.999 7 20.999H17C18.103 20.999 19 20.101 19 18.999V6.99902H5ZM11 17H9V11H11V17ZM15 17H13V11H15V17Z">
            </path>
        </svg>
        <h3>tgddiscord</h3>
        <div class="vert-divider"></div>
        <span> Bulk delete messages</span>
        <div class="spacer"></div>
        <div id="hide" class="icon" aria-label="Close" role="button" tabindex="0">
            <svg aria-hidden="false" width="24" height="24" viewBox="0 0 24 24">
                <path fill="currentColor"
                    d="M18.4 4L12 10.4L5.6 4L4 5.6L10.4 12L4 18.4L5.6 20L12 13.6L18.4 20L20 18.4L13.6 12L20 5.6L18.4 4Z">
                </path>
            </svg>
        </div>
    </div>
    <div class="window-body" style="display: flex; flex-direction: row;">
        <div class="sidebar scroll">
            <details open>
                <summary>General</summary>
                <fieldset>
                    <legend>
                        Author ID
                        <a href="{{WIKI}}/authorId" title="Help" target="_blank">help</a>
                    </legend>
                    <div class="multiInput">
                        <div class="input-wrapper">
                            <input class="input" id="authorId" type="text" priv>
                        </div>
                        <button id="getAuthor">me</button>
                    </div>
                </fieldset>
                <hr>
                <fieldset>
                    <legend>
                        Server ID
                        <a href="{{WIKI}}/guildId" title="Help" target="_blank">help</a>
                    </legend>
                    <div class="multiInput">
                        <div class="input-wrapper">
                            <input class="input" id="guildId" type="text" priv>
                        </div>
                        <button id="getGuild">current</button>
                    </div>
                </fieldset>
                <fieldset>
                    <legend>
                        Channel ID
                        <a href="{{WIKI}}/channelId" title="Help" target="_blank">help</a>
                    </legend>
                    <div class="multiInput mb1">
                        <div class="input-wrapper">
                            <input class="input" id="channelId" type="text" priv>
                        </div>
                        <button id="getChannel">current</button>
                    </div>
                    <div class="sectionDescription">
                        <label class="row"><input id="includeNsfw" type="checkbox">This is a NSFW channel</label>
                    </div>
                </fieldset>
            </details>
            <details>
                <summary>Import</summary>
                <fieldset>
                    <legend>
                        Import JSON
                        <a href="{{WIKI}}/importJson" title="Help" target="_blank">help</a>
                    </legend>
                    <div class="sectionDescription">
                        The import feature will be added back in the future.
                    </div>
                    <div class="">
                        <button id="importJson" disabled>Import</button>
                    </div>
                </fieldset>
            </details>
            <hr>
            <details>
                <summary>Filter</summary>
                <fieldset>
                    <legend>
                        Search
                        <a href="{{WIKI}}/filters" title="Help" target="_blank">help</a>
                    </legend>
                    <div class="input-wrapper">
                        <input id="search" type="text" placeholder="Containing text" priv>
                    </div>
                    <div class="sectionDescription">
                        Only delete messages that contain the text
                    </div>
                    <div class="sectionDescription">
                        <label><input id="hasLink" type="checkbox">has: link</label>
                    </div>
                    <div class="sectionDescription">
                        <label><input id="hasFile" type="checkbox">has: file</label>
                    </div>
                    <div class="sectionDescription">
                        <label><input id="includePinned" type="checkbox">Include pinned</label>
                    </div>
                </fieldset>
                <hr>
                <fieldset>
                    <legend>
                        Pattern
                        <a href="{{WIKI}}/pattern" title="Help" target="_blank">help</a>
                    </legend>
                    <div class="sectionDescription">
                        Delete messages that match the regular expression
                    </div>
                    <div class="input-wrapper">
                        <span class="info">/</span>
                        <input id="pattern" type="text" placeholder="regular expression" priv>
                        <span class="info">/</span>
                    </div>
                </fieldset>
            </details>
            <details>
                <summary>Messages interval</summary>
                <fieldset>
                    <legend>
                        Interval of messages
                        <a href="{{WIKI}}/messageId" title="Help" target="_blank">help</a>
                    </legend>
                    <div class="multiInput mb1">
                        <div class="input-wrapper">
                            <input id="minId" type="text" placeholder="After a message" priv>
                        </div>
                        <button id="pickMessageAfter">select</button>
                    </div>
                    <div class="multiInput">
                        <div class="input-wrapper">
                            <input id="maxId" type="text" placeholder="Before a message" priv>
                        </div>
                        <button id="pickMessageBefore">select</button>
                    </div>
                    <div class="sectionDescription">
                        Specify an interval to delete messages.
                    </div>
                </fieldset>
            </details>
            <details>
                <summary>Date</summary>
                <fieldset>
                    <legend>
                        After date
                        <a href="{{WIKI}}/dateRange" title="Help" target="_blank">help</a>
                    </legend>
                    <div class="input-wrapper mb1">
                        <input id="minDate" type="datetime-local" title="Messages posted AFTER this date">
                    </div>
                    <legend>
                        Before date
                        <a href="{{WIKI}}/dateRange" title="Help" target="_blank">help</a>
                    </legend>
                    <div class="input-wrapper">
                        <input id="maxDate" type="datetime-local" title="Messages posted BEFORE this date">
                    </div>
                    <div class="sectionDescription">
                        Delete messages that were posted between the two dates.
                    </div>
                    <div class="sectionDescription">
                        * Filtering by date doesn't work if you use the "Messages interval".
                    </div>
                </fieldset>
            </details>
            <hr>
            <details>
                <summary>Advanced settings</summary>
                <fieldset>
                    <legend>
                        Search delay
                        <a href="{{WIKI}}/delay" title="Help" target="_blank">help</a>
                    </legend>
                    <div class="input-wrapper">
                        <input id="searchDelay" type="number" value="100" step="100">
                    </div>
                </fieldset>
                <fieldset>
                    <legend>
                        Delete delay
                        <a href="{{WIKI}}/delay" title="Help" target="_blank">help</a>
                    </legend>
                    <div class="input-wrapper">
                        <input id="deleteDelay" type="number" value="1000" step="100">
                    </div>
                    <br>
                    <div class="sectionDescription">
                        This will affect the speed in which the messages are deleted.
                        Use the help link for more information.
                    </div>
                </fieldset>
            </details>
            <hr>
            <div></div>
            <div class="info">
                tgddiscord {{VERSION}}
                <br> Solomon Shalom Lijo
            </div>
        </div>
        <div class="main col">
            <div class="tbar col">
                <div class="row">
                    <button id="start" class="sizeMedium accent">Start</button>
                    <button id="stop" class="sizeMedium danger" disabled>Stop</button>
                    <button id="clear" class="sizeMedium">Clear log</button>
                    <label class="row" title="Hide sensitive information on your screen for taking screenshots">
                        <input id="redact" type="checkbox" checked> Streamer mode
                    </label>
                </div>
                <div class="row">
                    <progress id="progressBar" value="-1"></progress>
                </div>
            </div>
            <pre id="logArea" class="logarea scroll">
                <center>
                    <div><a href="https://github.com/solomonshalom/TGD-Discord" target="_blank" style="color: var(--text-brand);">Tell me what you think about this update</a></div>
                    <div>Star <a href="{{HOME}}" target="_blank">this project</a> on GitHub!</div>
                    <div><a href="{{HOME}}/discussions" target="_blank">Issues or help</a></div>
                </center>
            </pre>
            <div class="tbar footer row">
                <label>
                    <input id="autoScroll" type="checkbox" checked> Auto scroll
                </label>
                <span id="progressPercent"></span>
            </div>
        </div>
    </div>
</div>
`);
 
  /**
   * Delete all messages in a Discord channel or DM
   * @param {string} authToken Your authorization token
   * @param {string} authorId Author of the messages you want to delete
   * @param {string} guildId Server were the messages are located
   * @param {string} channelId Channel were the messages are located
   * @param {string} minId Only delete messages after this, leave blank do delete all
   * @param {string} maxId Only delete messages before this, leave blank do delete all
   * @param {string} content Filter messages that contains this text content
   * @param {boolean} hasLink Filter messages that contains link
   * @param {boolean} hasFile Filter messages that contains file
   * @param {boolean} includeNsfw Search in NSFW channels
   * @param {function(string, Array)} extLogger Function for logging
   * @param {function} stopHndl stopHndl used for stopping
   * @author Solomon Shalom Lijo <https://www.github.com/solomonshalom>
   * @see https://github.com/solomonshalom/TGD-Discord
   */
  async function deleteMessages(authToken, authorId, guildId, channelId, minId, maxId, content, hasLink, hasFile, includeNsfw, includePinned, pattern, searchDelay, deleteDelay, extLogger, stopHndl, onProgress) {
    const start = new Date();
    let delCount = 0;
    let failCount = 0;
    let avgPing;
    let lastPing;
    let grandTotal;
    let throttledCount = 0;
    let throttledTotalTime = 0;
    let offset = 0;
    let iterations = -1;
 
    const wait = async ms => new Promise(done => setTimeout(done, ms));
    const msToHMS = s => `${s / 3.6e6 | 0}h ${(s % 3.6e6) / 6e4 | 0}m ${(s % 6e4) / 1000 | 0}s`;
    const escapeHTML = html => html.replace(/[&<"']/g, m => ({ '&': '&amp;', '<': '&lt;', '"': '&quot;', '\'': '&#039;' })[m]);
    const redact = str => `<span class="priv">${escapeHTML(str)}</span><span class="mask">REDACTED</span>`;
    const queryString = params => params.filter(p => p[1] !== undefined).map(p => p[0] + '=' + encodeURIComponent(p[1])).join('&');
    const ask = async msg => new Promise(resolve => setTimeout(() => resolve(window.confirm(msg)), 10));
    const printDelayStats = () => log.verb(`Delete delay: ${deleteDelay}ms, Search delay: ${searchDelay}ms`, `Last Ping: ${lastPing}ms, Average Ping: ${avgPing | 0}ms`);
    const toSnowflake = (date) => /:/.test(date) ? ((new Date(date).getTime() - 1420070400000) * Math.pow(2, 22)) : date;
 
    const log = {
      debug() { return extLogger ? extLogger('debug', arguments) : console.debug.apply(console, arguments); },
      info() { return extLogger ? extLogger('info', arguments) : console.info.apply(console, arguments); },
      verb() { return extLogger ? extLogger('verb', arguments) : console.log.apply(console, arguments); },
      warn() { return extLogger ? extLogger('warn', arguments) : console.warn.apply(console, arguments); },
      error() { return extLogger ? extLogger('error', arguments) : console.error.apply(console, arguments); },
      success() { return extLogger ? extLogger('success', arguments) : console.info.apply(console, arguments); },
    };
 
    async function recurse() {
      let API_SEARCH_URL;
      if (guildId === '@me') {
        API_SEARCH_URL = `https://discord.com/api/v9/channels/${channelId}/messages/`; // DMs
      }
      else {
        API_SEARCH_URL = `https://discord.com/api/v9/guilds/${guildId}/messages/`; // Server
      }
 
      const headers = {
        'Authorization': authToken
      };
 
      if (onProgress) onProgress(-1, 1);
 
      let resp;
      try {
        const s = Date.now();
        resp = await fetch(API_SEARCH_URL + 'search?' + queryString([
          ['author_id', authorId || undefined],
          ['channel_id', (guildId !== '@me' ? channelId : undefined) || undefined],
          ['min_id', minId ? toSnowflake(minId) : undefined],
          ['max_id', maxId ? toSnowflake(maxId) : undefined],
          ['sort_by', 'timestamp'],
          ['sort_order', 'desc'],
          ['offset', offset],
          ['has', hasLink ? 'link' : undefined],
          ['has', hasFile ? 'file' : undefined],
          ['content', content || undefined],
          ['include_nsfw', includeNsfw ? true : undefined],
        ]), { headers });
        lastPing = (Date.now() - s);
        avgPing = avgPing > 0 ? (avgPing * 0.9) + (lastPing * 0.1) : lastPing;
      } catch (err) {
        return log.error('Search request threw an error:', err);
      }
 
      // not indexed yet
      if (resp.status === 202) {
        const w = (await resp.json()).retry_after * 1000;
        throttledCount++;
        throttledTotalTime += w;
        log.warn(`This channel wasn't indexed, waiting ${w}ms for discord to index it...`);
        await wait(w);
        return await recurse();
      }
 
      if (!resp.ok) {
        // searching messages too fast
        if (resp.status === 429) {
          const w = (await resp.json()).retry_after * 1000;
          throttledCount++;
          throttledTotalTime += w;
          searchDelay += w; // increase delay
          log.warn(`Being rate limited by the API for ${w}ms! Increasing search delay...`);
          printDelayStats();
          log.verb(`Cooling down for ${w * 2}ms before retrying...`);
 
          await wait(w * 2);
          return await recurse();
        } else {
          return log.error(`Error searching messages, API responded with status ${resp.status}!\n`, await resp.json());
        }
      }
 
      let regex;
 
      try {
        regex = new RegExp(pattern);
      } catch (e) {
        log.warn('Ignoring RegExp because pattern is malformed');
      }
 
      const data = await resp.json();
      const total = data.total_results;
      if (!grandTotal) grandTotal = total;
      const discoveredMessages = data.messages.map(convo => convo.find(message => message.hit === true));
      const messagesToDelete = discoveredMessages.filter(msg => {
        return (msg.type === 0 || (msg.type >= 6 && msg.type <= 21) || (msg.pinned && includePinned)) && (!regex || msg.content.match(regex));
      });
      const skippedMessages = discoveredMessages.filter(msg => !messagesToDelete.find(m => m.id === msg.id));
 
      const end = () => {
        log.success(`Ended at ${new Date().toLocaleString()}! Total time: ${msToHMS(Date.now() - start.getTime())}`);
        printDelayStats();
        log.verb(`Rate Limited: ${throttledCount} times. Total time throttled: ${msToHMS(throttledTotalTime)}.`);
        log.debug(`Deleted ${delCount} messages, ${failCount} failed.\n`);
      };
 
      const etr = msToHMS((searchDelay * Math.round(total / 25)) + ((deleteDelay + avgPing) * total));
      log.info(`Total messages found: ${data.total_results}`, `(Messages in current page: ${data.messages.length}, To be deleted: ${messagesToDelete.length}, System: ${skippedMessages.length})`, `offset: ${offset}`);
      printDelayStats();
      log.verb(`Estimated time remaining: ${etr}`);
 
 
      if (messagesToDelete.length > 0 || skippedMessages.length > 0) {
 
        if (++iterations < 1) {
          log.verb('Waiting for your confirmation...');
          if (!await ask(`Do you want to delete ~${total} messages?\nEstimated time: ${etr}\n\n---- Preview ----\n` +
                      messagesToDelete.map(m => `${m.author.username}#${m.author.discriminator}: ${m.attachments.length ? '[ATTACHMENTS]' : m.content}`).join('\n')))
            return end(log.error('Aborted by you!'));
          log.verb('OK');
        }
 
        for (let i = 0; i < messagesToDelete.length; i++) {
          const message = messagesToDelete[i];
          if (stopHndl && stopHndl()) return end(log.error('Stopped by you!'));
 
          log.debug(`${((delCount + 1) / grandTotal * 100).toFixed(2)}% (${delCount + 1}/${grandTotal})`,
            `Deleting ID:${redact(message.id)} <b>${redact(message.author.username + '#' + message.author.discriminator)} <small>(${redact(new Date(message.timestamp).toLocaleString())})</small>:</b> <i>${redact(message.content).replace(/\n/g, '???')}</i>`,
            message.attachments.length ? redact(JSON.stringify(message.attachments)) : '');
          if (onProgress) onProgress(delCount + 1, grandTotal);
 
          let resp;
          try {
            const s = Date.now();
            const API_DELETE_URL = `https://discord.com/api/v9/channels/${message.channel_id}/messages/${message.id}`;
            resp = await fetch(API_DELETE_URL, {
              headers,
              method: 'DELETE'
            });
            lastPing = (Date.now() - s);
            avgPing = (avgPing * 0.9) + (lastPing * 0.1);
            delCount++;
          } catch (err) {
            log.error('Delete request throwed an error:', err);
            log.verb('Related object:', redact(JSON.stringify(message)));
            failCount++;
          }
 
          if (!resp.ok) {
            // deleting messages too fast
            if (resp.status === 429) {
              const w = (await resp.json()).retry_after * 1000;
              throttledCount++;
              throttledTotalTime += w;
              deleteDelay = w; // increase delay
              log.warn(`Being rate limited by the API for ${w}ms! Adjusted delete delay to ${deleteDelay}ms.`);
              printDelayStats();
              log.verb(`Cooling down for ${w * 2}ms before retrying...`);
              await wait(w * 2);
              i--; // retry
            } else {
              log.error(`Error deleting message, API responded with status ${resp.status}!`, await resp.json());
              log.verb('Related object:', redact(JSON.stringify(message)));
              failCount++;
            }
          }
 
          await wait(deleteDelay);
        }
 
        if (skippedMessages.length > 0) {
          grandTotal -= skippedMessages.length;
          offset += skippedMessages.length;
          log.verb(`Found ${skippedMessages.length} system messages! Decreasing grandTotal to ${grandTotal} and increasing offset to ${offset}.`);
        }
 
        log.verb(`Searching next messages in ${searchDelay}ms...`, (offset ? `(offset: ${offset})` : ''));
        await wait(searchDelay);
 
        if (stopHndl && stopHndl()) return end(log.error('Stopped by you!'));
 
        return await recurse();
      } else {
        if (total - offset > 0) log.warn('Ended because API returned an empty page.');
        return end();
      }
    }
 
    log.success(`\nStarted at ${start.toLocaleString()}`);
    log.debug(`authorId="${redact(authorId)}" guildId="${redact(guildId)}" channelId="${redact(channelId)}" minId="${redact(minId)}" maxId="${redact(maxId)}" hasLink=${!!hasLink} hasFile=${!!hasFile}`);
    if (onProgress) onProgress(null, 1);
    return await recurse();
  }
 
  class Drag {
    /**
       * Make an element draggable/resizable
       * @param {Element} targetElm The element that will be dragged/resized
       * @param {Element} handleElm The element that will listen to events (handdle/grabber)
       * @param {object} [options] Options
       * @param {string} [options.mode="move"] Define the type of operation (move/resize)
       * @param {number} [options.minWidth=200] Minimum width allowed to resize
       * @param {number} [options.maxWidth=Infinity] Maximum width allowed to resize
       * @param {number} [options.minHeight=100] Maximum height allowed to resize
       * @param {number} [options.maxHeight=Infinity] Maximum height allowed to resize
       * @param {string} [options.draggingClass="drag"] Class added to targetElm while being dragged
       * @param {boolean} [options.useMouseEvents=true] Use mouse events
       * @param {boolean} [options.useTouchEvents=true] Use touch events
       *
       * @author Victor N. wwww.vitim.us
       */
    constructor(targetElm, handleElm, options) {
      this.options = Object.assign({
        mode: 'move',
 
        minWidth: 200,
        maxWidth: Infinity,
        minHeight: 100,
        maxHeight: Infinity,
        xAxis: true,
        yAxis: true,
 
        draggingClass: 'drag',
 
        useMouseEvents: true,
        useTouchEvents: true,
      }, options);
 
      // Public properties
      this.minWidth = this.options.minWidth;
      this.maxWidth = this.options.maxWidth;
      this.minHeight = this.options.minHeight;
      this.maxHeight = this.options.maxHeight;
      this.xAxis = this.options.xAxis;
      this.yAxis = this.options.yAxis;
      this.draggingClass = this.options.draggingClass;
 
      /** @private */
      this._targetElm = targetElm;
      /** @private */
      this._handleElm = handleElm;
 
      const moveOp = (x, y) => {
        let l = x - offLeft;
        if (x - offLeft < 0) l = 0; //offscreen <-
        else if (x - offRight > vw) l = vw - this._targetElm.clientWidth; //offscreen ->
        let t = y - offTop;
        if (y - offTop < 0) t = 0; //offscreen /\
        else if (y - offBottom > vh) t = vh - this._targetElm.clientHeight; //offscreen \/
 
        if(this.xAxis) this._targetElm.style.left = `${l}px`;
        if(this.yAxis) this._targetElm.style.top = `${t}px`;
        // NOTE: profilling on chrome translate wasn't faster than top/left as expected. And it also permanently creates a new layer, increasing vram usage.
        // this._targetElm.style.transform = `translate(${l}px, ${t}px)`;
      };
 
      const resizeOp = (x, y) => {
        let w = x - this._targetElm.offsetLeft - offRight;
        if (x - offRight > vw) w = Math.min(vw - this._targetElm.offsetLeft, this.maxWidth); //offscreen ->
        else if (x - offRight - this._targetElm.offsetLeft > this.maxWidth) w = this.maxWidth; //max width
        else if (x - offRight - this._targetElm.offsetLeft < this.minWidth) w = this.minWidth; //min width
        let h = y - this._targetElm.offsetTop - offBottom;
        if (y - offBottom > vh) h = Math.min(vh - this._targetElm.offsetTop, this.maxHeight); //offscreen \/
        else if (y - offBottom - this._targetElm.offsetTop > this.maxHeight) h = this.maxHeight; //max height
        else if (y - offBottom - this._targetElm.offsetTop < this.minHeight) h = this.minHeight; //min height
 
        if(this.xAxis) this._targetElm.style.width = `${w}px`;
        if(this.yAxis) this._targetElm.style.height = `${h}px`;
      };
 
      // define which operation is performed on drag
      const operation = this.options.mode === 'move' ? moveOp : resizeOp;
 
      // offset from the initial click to the target boundaries
      let offTop, offLeft, offBottom, offRight;
 
      let vw = window.innerWidth;
      let vh = window.innerHeight;
 
 
      function dragStartHandler(e) {
        const touch = e.type === 'touchstart';
 
        if ((e.buttons === 1 || e.which === 1) || touch) {
          e.preventDefault();
 
          const x = touch ? e.touches[0].clientX : e.clientX;
          const y = touch ? e.touches[0].clientY : e.clientY;
 
          const targetOffset = this._targetElm.getBoundingClientRect();
 
          //offset from the click to the top-left corner of the target (drag)
          offTop = y - targetOffset.y;
          offLeft = x - targetOffset.x;
          //offset from the click to the bottom-right corner of the target (resize)
          offBottom = y - (targetOffset.y + targetOffset.height);
          offRight = x - (targetOffset.x + targetOffset.width);
 
          vw = window.innerWidth;
          vh = window.innerHeight;
 
          if (this.options.useMouseEvents) {
            document.addEventListener('mousemove', this._dragMoveHandler);
            document.addEventListener('mouseup', this._dragEndHandler);
          }
          if (this.options.useTouchEvents) {
            document.addEventListener('touchmove', this._dragMoveHandler, {
              passive: false,
            });
            document.addEventListener('touchend', this._dragEndHandler);
          }
 
          this._targetElm.classList.add(this.draggingClass);
        }
      }
 
      function dragMoveHandler(e) {
        e.preventDefault();
        let x, y;
 
        const touch = e.type === 'touchmove';
        if (touch) {
          const t = e.touches[0];
          x = t.clientX;
          y = t.clientY;
        } else { //mouse
 
          // If the button is not down, dispatch a "fake" mouse up event, to stop listening to mousemove
          // This happens when the mouseup is not captured (outside the browser)
          if ((e.buttons || e.which) !== 1) {
            this._dragEndHandler();
            return;
          }
 
          x = e.clientX;
          y = e.clientY;
        }
 
        operation(x, y);
      }
 
      function dragEndHandler(e) {
        if (this.options.useMouseEvents) {
          document.removeEventListener('mousemove', this._dragMoveHandler);
          document.removeEventListener('mouseup', this._dragEndHandler);
        }
        if (this.options.useTouchEvents) {
          document.removeEventListener('touchmove', this._dragMoveHandler);
          document.removeEventListener('touchend', this._dragEndHandler);
        }
        this._targetElm.classList.remove(this.draggingClass);
      }
 
      // We need to bind the handlers to this instance and expose them to methods enable and destroy
      /** @private */
      this._dragStartHandler = dragStartHandler.bind(this);
      /** @private */
      this._dragMoveHandler = dragMoveHandler.bind(this);
      /** @private */
      this._dragEndHandler = dragEndHandler.bind(this);
 
      this.enable();
    }
 
    /**
     * Turn on the drag and drop of the instancea
     * @memberOf Drag
     */
    enable() {
      // this.destroy(); // prevent events from getting binded twice
      if (this.options.useMouseEvents) this._handleElm.addEventListener('mousedown', this._dragStartHandler);
      if (this.options.useTouchEvents) this._handleElm.addEventListener('touchstart', this._dragStartHandler, { passive: false });
    }
    /**
     * Teardown all events bound to the document and elements
     * You can resurrect this instance by calling enable()
     * @memberOf Drag
     */
    destroy() {
      this._targetElm.classList.remove(this.draggingClass);
 
      if (this.options.useMouseEvents) {
        this._handleElm.removeEventListener('mousedown', this._dragStartHandler);
        document.removeEventListener('mousemove', this._dragMoveHandler);
        document.removeEventListener('mouseup', this._dragEndHandler);
      }
      if (this.options.useTouchEvents) {
        this._handleElm.removeEventListener('touchstart', this._dragStartHandler);
        document.removeEventListener('touchmove', this._dragMoveHandler);
        document.removeEventListener('touchend', this._dragEndHandler);
      }
    }
  }
 
  function createElm(html) {
    const temp = document.createElement('div');
    temp.innerHTML = html;
    return temp.removeChild(temp.firstElementChild);
  }
 
  function insertCss(css) {
    const style = document.createElement('style');
    style.appendChild(document.createTextNode(css));
    document.head.appendChild(style);
    return style;
  }
 
  const messagePickerCss = `
body.tgddiscord-pick-message [data-list-id="chat-messages"] {
  background-color: var(--background-secondary-alt);
  box-shadow: inset 0 0 0px 2px var(--button-outline-brand-border);
}
 
body.tgddiscord-pick-message [id^="message-content-"]:hover {
  cursor: pointer;
  cursor: cell;
  background: var(--background-message-automod-hover);
}
body.tgddiscord-pick-message [id^="message-content-"]:hover::after {
  position: absolute;
  top: calc(50% - 11px);
  left: 4px;
  z-index: 1;
  width: 65px;
  height: 22px;
  line-height: 22px;
  font-family: var(--font-display);
  background-color: var(--button-secondary-background);
  color: var(--header-secondary);
  font-size: 12px;
  font-weight: 500;
  text-transform: uppercase;
  text-align: center;
  border-radius: 3px;
  content: 'This ????';
}
body.tgddiscord-pick-message.before [id^="message-content-"]:hover::after {
  content: 'Before ????';
}
body.tgddiscord-pick-message.after [id^="message-content-"]:hover::after {
  content: 'After ????';
}
`;
 
  const messagePicker = {
    init() {
      insertCss(messagePickerCss);
    },
    grab(auxiliary) {
      return new Promise((resolve, reject) => {
        document.body.classList.add('tgddiscord-pick-message');
        if (auxiliary) document.body.classList.add(auxiliary);
        function clickHandler(e) {
          const message = e.target.closest('[id^="message-content-"]');
          if (message) {
            e.preventDefault();
            e.stopPropagation();
            e.stopImmediatePropagation();
            if (auxiliary) document.body.classList.remove(auxiliary);
            document.body.classList.remove('tgddiscord-pick-message');
            document.removeEventListener('click', clickHandler);
            try {
              resolve(message.id.match(/message-content-(\d+)/)[1]);
            } catch (e) {
              resolve(null);
            }
          }
        }
        document.addEventListener('click', clickHandler);
      });
    }
  };
 
  var messagePicker$1 = messagePicker;
  window.messagePicker = messagePicker;
 
  function getToken() {
    window.dispatchEvent(new Event('beforeunload'));
    const LS = document.body.appendChild(document.createElement('iframe')).contentWindow.localStorage;
    return JSON.parse(LS.token);
  }
 
  function getAuthorId() {
    const LS = document.body.appendChild(document.createElement('iframe')).contentWindow.localStorage;
    return JSON.parse(LS.user_id_cache);
  }
 
  function getGuildId() {
    const m = location.href.match(/channels\/([\w@]+)\/(\d+)/);
    if (m) return m[1];
    else alert('Could not the Guild ID!\nPlease make sure you are on a Server or DM.');
  }
 
  function getChannelId() {
    const m = location.href.match(/channels\/([\w@]+)\/(\d+)/);
    if (m) return m[2];
    else alert('Could not the Channel ID!\nPlease make sure you are on a Channel or DM.');
  }
 
  // ------------------------- User interface ------------------------------ //
 
  const HOME = 'https://github.com/solomonshalom/TGD-Discord';
  const WIKI = 'https://github.com/solomonshalom/TGD-Discord/wiki';
 
  const $ = s => tgddiscordWindow.querySelector(s);
 
  let tgddiscordWindow;
  let tgddiscordBtn;
 
  function initUI() {
 
    insertCss(discordStyles);
    insertCss(tgddiscordStyles);
 
    function replaceInterpolations(str, obj, removeMissing = false) {
      return str.replace(/\{\{([\w_]+)\}\}/g, (m, key) => obj[key] || (removeMissing ? '' : m));
    }
 
    const templateVariables = {
      VERSION: version,
      HOME,
      WIKI,
    };
 
    // create tgddiscord window
    const tgddiscordUI = replaceInterpolations(tgddiscordTemplate, templateVariables);
    tgddiscordWindow = createElm(tgddiscordUI);
    document.body.appendChild(tgddiscordWindow);
 
    new Drag(tgddiscordWindow, $('.header'), { mode: 'move' });
    new Drag(tgddiscordWindow, $('.footer'), { mode: 'resize' });
 
    // create tgddiscord button
    tgddiscordBtn = createElm(buttonHtml);
    tgddiscordBtn.onclick = toggleWindow;
    function mountBtn() {
      const toolbar = document.querySelector('#app-mount [class^=toolbar]');
      if (toolbar) toolbar.appendChild(tgddiscordBtn);
    }
    mountBtn();
 
    // watch for changes and re-mount button if necessary
    const discordElm = document.querySelector('#app-mount');
    let observerThrottle = null;
    const observer = new MutationObserver((_mutationsList, _observer) => {
      if (observerThrottle) return;
      observerThrottle = setTimeout(() => {
        observerThrottle = null;
        if (!discordElm.contains(tgddiscordBtn)) mountBtn(); // re-mount the button to the toolbar
      }, 3000);
    });
    observer.observe(discordElm, { attributes: false, childList: true, subtree: true });
 
    function toggleWindow() {
      if (tgddiscordWindow.style.display !== 'none') {
        tgddiscordWindow.style.display = 'none';
        tgddiscordBtn.style.color = 'var(--interactive-normal)';
      }
      else {
        tgddiscordWindow.style.display = '';
        tgddiscordBtn.style.color = 'var(--interactive-active)';
      }
    }
 
    messagePicker$1.init();
 
    // register event listeners
    $('#hide').onclick = toggleWindow;
    $('button#start').onclick = start;
    $('button#stop').onclick = stop;
    $('button#clear').onclick = () => $('#logArea').innerHTML = '';
    $('button#getAuthor').onclick = () => $('input#authorId').value = getAuthorId();
    $('button#getGuild').onclick = () => {
      const guildId = $('input#guildId').value = getGuildId();
      if (guildId === '@me') $('input#channelId').value = getChannelId();
    };
    $('button#getChannel').onclick = () => {
      $('input#channelId').value = getChannelId();
      $('input#guildId').value = getGuildId();
    };
    $('#redact').onchange = () => {
      const b = tgddiscordWindow.classList.toggle('redact');
      if (b) alert('This mode will attempt to hide personal information, so you can screen share / take screenshots.\nAlways double check you are not sharing sensitive information!');
    };
 
    $('#pickMessageAfter').onclick = async () => {
      // alert('Select a message on the chat.\nThe message below it will be deleted.');
      const id = await messagePicker$1.grab('after');
      if (id) $('input#minId').value = id;
    };
    $('#pickMessageBefore').onclick = async () => {
      // alert('Select a message on the chat.\nThe message above it will be deleted.');
      const id = await messagePicker$1.grab('before');
      if (id) $('input#maxId').value = id;
    };
 
    // const fileSelection = $('input#importJson');
    // fileSelection.onchange = () => {
    //   const files = fileSelection.files;
    //   const channelIdField = $('input#channelId');
    //   if (files.length > 0) {
    //     const file = files[0];
    //     file.text().then(text => {
    //       let json = JSON.parse(text);
    //       let channels = Object.keys(json);
    //       channelIdField.value = channels.join(',');
    //     });
    //   }
    // };
 
  }
 
  let _stopFlag = false;
  const stopHndl = () => _stopFlag;
 
  async function start() {
    console.log('start');
    _stopFlag = false;
 
    // general
    const authToken = getToken();
    const authorId = $('input#authorId').value.trim();
    const guildId = $('input#guildId').value.trim();
    const channelIds = $('input#channelId').value.trim().split(/\s*,\s*/);
    const includeNsfw = $('input#includeNsfw').checked;
    // filter
    const content = $('input#search').value.trim();
    const hasLink = $('input#hasLink').checked;
    const hasFile = $('input#hasFile').checked;
    const includePinned = $('input#includePinned').checked;
    const pattern = $('input#pattern').value;
    // message interval
    const minId = $('input#minId').value.trim();
    const maxId = $('input#maxId').value.trim();
    // date range
    const minDate = $('input#minDate').value.trim();
    const maxDate = $('input#maxDate').value.trim();
    //advanced
    const searchDelay = parseInt($('input#searchDelay').value.trim());
    const deleteDelay = parseInt($('input#deleteDelay').value.trim());
 
    // progress handler
    const progress = $('#progressBar');
    const progress2 = tgddiscordBtn.querySelector('progress');
    const percent = $('#progressPercent');
    const onProg = (value, max) => {
      if (value && max && value > max) max = value;
      progress.setAttribute('max', max);
      progress2.setAttribute('max', max);
      progress.value = value;
      progress2.value = value;
      progress.style.display = max ? '' : 'none';
      progress2.style.display = max ? '' : 'none';
      percent.style.display = value && max ? '' : 'none';
      percent.innerHTML = value >= 0 && max ? Math.round(value / max * 100) + '%' : '';
      // indeterminate progress bar
      if (value === -1) {
        progress.removeAttribute('value');
        progress2.removeAttribute('value');
        percent.innerHTML = '...';
      }
    };
 
    let logArea = $('#logArea');
    let autoScroll = $('#autoScroll');
    const logger = (type = '', args) => {
      const style = { '': '', info: 'color:#00b0f4;', verb: 'color:#72767d;', warn: 'color:#faa61a;', error: 'color:#f04747;', success: 'color:#43b581;' }[type];
      logArea.insertAdjacentHTML('beforeend', `<div style="${style}">${Array.from(args).map(o => typeof o === 'object' ? JSON.stringify(o, o instanceof Error && Object.getOwnPropertyNames(o)) : o).join('\t')}</div>`);
      if (autoScroll.checked) logArea.querySelector('div:last-child').scrollIntoView(false);
    };
 
    logArea.innerHTML = '';
 
    // validate input
    if (!authToken) return logger('error', ['Could not detect the authorization token!']) || logger('info', ['Please make sure tgddiscord is up to date']);
    else if (!authorId) return logger('error', ['You must provide an Author ID!']);
    else if (!guildId) return logger('error', ['You must provide a Server ID!']);
 
    for (let i = 0; i < channelIds.length; i++) {
      $('#start').disabled = true;
      $('#stop').disabled = false;
      await deleteMessages(authToken, authorId, guildId, channelIds[i], minId || minDate, maxId || maxDate, content, hasLink, hasFile, includeNsfw, includePinned, pattern, searchDelay, deleteDelay, logger, stopHndl, onProg);
      stop(); // clear the running state
    }
 
  }
 
  function stop() {
    _stopFlag = true;
    $('#start').disabled = false;
    $('#stop').disabled = true;
 
    $('#progressBar').style.display = 'none';
    $('#progressPercent').style.display = 'none';
    tgddiscordBtn.querySelector('progress').style.display = 'none';
  }
 
  initUI();
 
 
  // ---- END tgddiscord ----
 
})();