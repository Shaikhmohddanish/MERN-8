class Solution {
    public int findLucky(int[] arr) {
        int luckyNumber = -1;
        Map<Integer,Integer> map = new HashMap<>();

        for(int i = 0;i<arr.length;i++){
            map.put(arr[i],map.getOrDefault(arr[i],0)+1);
        }
        
        for(Map.Entry<Integer,Integer> entry : map.entrySet()){
            if(entry.getKey() == entry.getValue() && entry.getKey() > luckyNumber ){
                luckyNumber = entry.getKey();
            }
        }

        return luckyNumber;
    }
}