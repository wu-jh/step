#include <stdio.h>

int main()
{
    int i=1;
    float num;
    int count=0;
    float sum=0;
    printf("请输入任意数字,以任意非数字字符结束\n");
    while(i){
	if(scanf("%f",&num)!=1){
    	     break;
	}
	count++;
	sum+=num;
    }
    float avg=sum/count;
    printf("平均值为%f\n",avg);
    return 0;
}
