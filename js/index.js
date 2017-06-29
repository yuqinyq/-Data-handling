/**
 * Created by PX on 2017/5/19.
 */

var oWid = $(document).width();
var oHeight = $(document).height();
var str = "";
$(function () {
	//加载数据
    $("form>input:first-child").click(function () {
    	$("thead input").prop("checked",false); //刷新选中框
        $("thead i").removeClass("fa-angle-down fa-angle-up").addClass("fa-angle-right");//刷新排序按钮为默认
        $.getJSON("json/goodsData.json",function(result){
            //数据遍历加载
            if($("tbody input").length !== 0){
                jsonData(result);
            }else {
                loadAnimation(result);
            }
        });
        //thead input选中后tbody input变化
        $("thead input").change(function(){
        	
        	var state = $(this).prop("checked");
        	if(state){
        		$("tbody input").prop("checked",true);
        	}else{
        		$("tbody input").prop("checked",false);
        	};
        });
        //btn删除数据
        $("form>input:last-child").click(function(){
        	$("tbody input").each(function(){
        		if($(this).prop("checked") == true){
        			$(this).parents().eq(1).remove();
        		}
        	});
        	if($("tbody input").length == 0){
        		$("thead input").prop("checked",false);
        	};
        	if($("tbody input:checked").length == 0){
        		$("thead input").get(0).indeterminate = false;
        		$("thead input").prop("checked",false);
        	}
        });
        //商品编号排序
        sortOrder(0);
        //生产日期排序
        sortOrder(1);
        //进货日期排序
        sortOrder(2);
        //售价排序
        sortOrder(3);
    });
});

/*
 * 函数封装
 *
 * */

//全选或者全不选 (thead input变化),参数：tbody选中框标签
function cks(checkbox){
    var total = checkbox.length; //选项总个数
    var count = 0; //计数器
    checkbox.each(function(){
        if($(this).prop("checked") == true){
            count ++;
        };
    });
    if(count == total && count !==0){
        //全选
        $("thead input").get(0).indeterminate = false;
        $("thead input").prop("checked",true);
    }else if(count == 0){
        //全不选
        $("thead input").get(0).indeterminate = false;
        $("thead input").prop("checked",false);
    }else{
        //不全选
        $("thead input").get(0).indeterminate = true;
    }
}

//排序
function sortOrder(idx) {
    $("thead").find("i").eq(idx).click(function () {
        //判断tbody是否有数据
        var hasData = $("tbody").children().length;
        if(!hasData){
            return;
        };
        //设置三种状态，默认，升序，降序
        var isNormal = $(this).hasClass("fa-angle-right");
        var isAscending = $(this).hasClass("fa-angle-up");
        var isDescending = $(this).hasClass("fa-angle-down");
        //进行升序
        if(isNormal || isDescending){
            //添加当前升序的class,将其他项变为默认
            $(this).removeClass("fa-angle-right fa-angle-down").addClass("fa-angle-up")
            .parent().siblings().children("i.fa").removeClass("fa-angle-down fa-angle-up").addClass("fa-angle-right");
            //编号升序排序
            if (idx == 0){
                $.getJSON("json/goodsData.json",function (data) {
                    var numData = data.sort(function(a,b){
                       var num1 = a.id.slice(a.id.indexOf("\-")+1);
                       var num2 = b.id.slice(b.id.indexOf("\-")+1);
                        return num1 - num2;
                    });
                    loadAnimation(numData);
                }) ;
            }
            //生产日期升序排序
            else if(idx == 1){
                $.getJSON("json/goodsData.json",function (data) {
                    var numData = data.sort(function(a,b){
                        var num1 = a.manufacDate.replace(/\-/g,"");
                        var num2 = b.manufacDate.replace(/\-/g,"");
                        return num1 - num2;
                    });
                    loadAnimation(numData);
                }) ;
            }
            //进货日期升序排序
            else if(idx == 2){
                $.getJSON("json/goodsData.json",function (data) {
                    var numData = data.sort(function(a,b){
                        var num1 = a.stockDete.replace(/\-/g,"");
                        var num2 = b.stockDete.replace(/\-/g,"");
                        return num1 - num2;
                    });
                    loadAnimation(numData);
                }) ;
            }
            //售价升序排序
            else if(idx == 3){
                $.getJSON("json/goodsData.json",function (data) {
                    var numData = data.sort(function(a,b){
                        var num1 = a.price.slice(a.price.indexOf("￥")+1);
                        var num2 = b.price.slice(b.price.indexOf("￥")+1);
                        return num1 - num2;
                    });
                    loadAnimation(numData);
                }) ;
            }
            else {
                return;
            }
        }
        //进行降序
        else if(isAscending){
            //添加当前降序的class,将其他项变为默认
            $(this).removeClass("fa-angle-up").addClass("fa-angle-down")
                .parent().siblings().children("i.fa").removeClass("fa-angle-down fa-angle-up").addClass("fa-angle-right");
            //编号降序排序
            if (idx == 0){
                $.getJSON("json/goodsData.json",function (data) {
                    var numData = data.sort(function(a,b){
                        var num1 = a.id.slice(a.id.indexOf("\-")+1);
                        var num2 = b.id.slice(b.id.indexOf("\-")+1);
                        return num2 - num1;
                    });
                    loadAnimation(numData);
                }) ;
            }
            //生产日期降序排序
            else if(idx == 1){
                $.getJSON("json/goodsData.json",function (data) {
                    var numData = data.sort(function(a,b){
                        var num1 = a.manufacDate.replace(/\-/g,"");
                        var num2 = b.manufacDate.replace(/\-/g,"");
                        return num2 - num1;
                    });

                    loadAnimation(numData);
                }) ;
            }
            //进货日期降序排序
            else if(idx == 2){
                $.getJSON("json/goodsData.json",function (data) {
                    var numData = data.sort(function(a,b){
                        var num1 = a.stockDete.replace(/\-/g,"");
                        var num2 = b.stockDete.replace(/\-/g,"");
                        return num2 - num1;
                    });
                    loadAnimation(numData);
                }) ;
            }
            //售价降序排序
            else if(idx == 3){
                $.getJSON("json/goodsData.json",function (data) {
                    var numData = data.sort(function(a,b){
                        var num1 = a.price.slice(a.price.indexOf("￥")+1);
                        var num2 = b.price.slice(b.price.indexOf("￥")+1);
                        return num2 - num1;
                    });
                    loadAnimation(numData);
                }) ;
            }
            else {
                return;
            }
        }
    });
}

//数据遍历加载
function jsonData(result) {
    $.each(result, function (idx, data) {
        str += "<tr>" +
            "<td>" + data.choose + "</td>" +
            "<td>" + data.id + "</td>" +
            "<td>" + data.goods + "</td>" +
            "<td>" + data.manufacDate + "</td>" +
            "<td>" + data.stockDete + "</td>" +
            "<td>" + data.qualityDete + "年</td>" +
            "<td>" + "￥" + Number(data.price).toFixed(2) + "</td>" +
            "<td>" + data.command + "</td>" +
            "</tr>"
    });
    $("tbody").text("");
    $("tbody").append(str);
    $("tbody input").change(function(){
        cks($("tbody input"));
    });
    //a便签删除数据
    $(".delete").click(function(){
        $(this).parents().eq(1).remove();
        cks($("tbody input"));
    });
}

//页面加载动画
function loadAnimation(numData){
    $("script:first").before(
        "<div class=\"popBox\">"+
            "<div class=\"mask\"></div>"+
            "<div class=\"circle\"><i class=\"fa fa-spinner fa-spin fa-5x\" ></div>"+
        "</div>"
    );
    setTimeout(function () {
        jsonData(numData);
        // 清除载入等待动画
        $(".popBox").fadeOut(600, function() {
            $(this).remove();
        });
    },1000);
}