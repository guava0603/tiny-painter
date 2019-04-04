# Software Studio 2018 Spring Assignment 01 Web Canvas

## Web Canvas
<img src="example01.gif" width="700px" height="500px"></img>

## Todo
1. **Fork the repo ,remove fork relationship and change project visibility to public.**
2. Create your own web page with HTML5 canvas element where we can draw somethings.
3. Beautify appearance (CSS).
4. Design user interaction widgets and control tools for custom setting or editing (JavaScript).
5. **Commit to "your" project repository and deploy to Gitlab page.**
6. **Describing the functions of your canvas in REABME.md**

## Scoring (Check detailed requirments via iLMS)

| **Item**                                         | **Score** |
| :----------------------------------------------: | :-------: |
| Basic components                                 | 60%       |
| Advance tools                                    | 35%       |
| Appearance (subjective)                          | 5%        |
| Other useful widgets (**describe on README.md**) | 1~10%     |

## Reminder
* Do not make any change to our root project repository.
* Deploy your web page to Gitlab page, and ensure it works correctly.
    * **Your main page should be named as ```index.html```**
    * **URL should be : https://[studentID].gitlab.io/AS_01_WebCanvas**
* You should also upload all source code to iLMS.
    * .html or .htm, .css, .js, etc.
    * source files
* **Deadline: 2018/04/05 23:59 (commit time)**
    * Delay will get 0 point (no reason)
    * Copy will get 0 point
    * "屍體" and 404 is not allowed

---

## Put your report below here

* 進入頁面後左至右依序分為 canvas、menu、color 三個部分
* 右側 menu 中每個按鈕都是一個按鈕，有的功能相似的按鈕 hover 後才會顯示
  1. 第一個按鈕是鉛筆、麥克筆與噴霧（噴霧的範圍能透過下方 line width 的 bar 調整）
  2. 第二個按鈕是橡皮擦，大小可透過下方 eraser size 的 bar 調整
  3. 第三個按鈕是圓形拖曳，有分為空心和實心兩種
  4. 第四個按鈕是矩形拖曳，有分為空心和實心兩種
  5. 第五個按鈕是三角形拖曳，有分為空心和實心兩種（以上三者的空心都能透過下方 line width 的 bar 調整）
  6. 第六個按鈕是文字，使用方式比較特別
    a. 可以在下方透過 font size 的 bar 調整字體大小
    b. 透過字型的選單調整字型
    c. 在輸入框中輸入想要的文字
    d. 在畫面想要顯示文字的部分點擊一下
    e. 點擊文字按鈕，文字即會顯示
  7. 第七個按鈕是上傳圖片，點擊後可以在本機選取欲上傳的圖片
  8. 第八個按鈕是下載按鈕，點擊後即可下載目前的畫面
  9. 第九個按鈕是全部清除，點擊後可以清除目前畫面
  10. 最後兩個則分別是 undo 與 redo 按鍵
* 最右側是 color 選單，在想要的色票上點擊一下後就能使用該種顏色了