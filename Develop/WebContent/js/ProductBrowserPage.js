$(document).ready(() => {

    var itemPerPage = 3; // 一頁幾個商品
    var nowPage = 1;
    var totalPage = 0; // 全部頁數

    $.ajax({
        url: "RetrieveProductServlet.do",
        data: {
            action: "RetrieveProduct"
        },
        type: "get",
        dataType: "json",
        success: function(data) {
            // 上傳檔案
            function uploadDataToTable(producCategory) {
                var txt = ' ';
                var dataLength = 0;
                for (let i = 0; i < data.length; i++) {
                    if (data[i].category == producCategory) {

                        var base64String = btoa(String.fromCharCode.apply(null, new Uint8Array(data[i].thumbnail)));
                        txt += "<tr><td>" + "<a href='searchGame?productName=" + data[i].productName + "'><img src='data:image/jpg;base64," + base64String + "' width='230px'></a>" +
                            '</td><td class="pName" id="' + data[i].productID + '">' + data[i].productName + '</td><td>' + data[i].category + '</td><td>$' + data[i].price +
                            '</td><td>' + "<a href='searchGame?productName=" + data[i].productName + "'><input class='infobutton' type='button' value='詳細資訊'></a>  <input class='cartbutton' type='button' value='加入購物車'>" +
                            '</td></tr></a>';
                        dataLength++;
                    }
                }
                // txt += ' ';
                $("#content" + producCategory).append(txt);

                // 計算總頁數
                totalPage = Math.ceil(dataLength / itemPerPage);

                // 建立頁面數字連結
                $("#page" + producCategory).append('<br/');
                $("#page" + producCategory).append('<h3 id="pre' + producCategory + '"> << </h3>');

                for (let i = 0; i < totalPage; i++) {
                    // 建立頁面數字
                    $("#page" + producCategory).append('<h3>' + (i + 1) + '</h3>');

                    $("#page" + producCategory + " h3").eq(i + 1).click(() => {
                        $("#content" + producCategory + " tr").hide();
                        for (let item = i * itemPerPage; item < (i + 1) * itemPerPage; item++) {
                            $("#content" + producCategory + " tr").eq(item).show();
                        }
                        nowPage = i + 1;
                        $("#nowPage").text(nowPage);
                    })
                }
                $("#page" + producCategory).append('<h3 id="next' + producCategory + '">>></h3>');

                // 上一頁
                $("#pre" + producCategory).click(() => {
                        if (nowPage > 1) {
                            nowPage = nowPage - 1;
                            $("#page" + producCategory + " h3").eq(nowPage).click();
                            $("#nowPage").text(nowPage);
                        }
                    })
                    // 下一頁
                $("#next" + producCategory).click(() => {
                        if (nowPage < totalPage) {
                            nowPage = nowPage + 1;
                            $("#page" + producCategory + " h3").eq(nowPage).click();
                            $("#nowPage").text(nowPage);
                        }
                    })
                    // 初次建立
                $("#page" + producCategory + " h3").eq(1).click();

            }

            uploadDataToTable("Massager");
            uploadDataToTable("Yoga");
            uploadDataToTable("Supplement");

        }
    })
})