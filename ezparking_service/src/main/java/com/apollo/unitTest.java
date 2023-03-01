import com.apollo.apolloApplication;
import com.apollo.mapper.amountMapper;
import com.apollo.pojo.enity.StartEnd;
import com.apollo.pojo.enity.amount;
import com.apollo.service.impl.pointWayServiceImpl;
import com.apollo.service.pointWayService;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.core.conditions.update.UpdateWrapper;
import org.junit.jupiter.api.Assertions;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringRunner;

@RunWith(SpringRunner.class)
@SpringBootTest(classes= apolloApplication.class)

public class unitTest {
   @Autowired
   pointWayService pointWayService;
// In this test, I compare the distance I already know with the distance I calculated. If the error is within 100 meters, we pass.
    @Test
    public void testCalculateDistance() {
        double startLat = 39.1111;
        double startLong = 116.2222;
        double endLat = 40.2222;
        double endLong = 117.3333;
        double expectedDistance = 220446; // The expected distance calculated from the given start and end points
        double result = pointWayService.calculateDistance(startLat,startLong,endLat,endLong);
        Assertions.assertEquals(expectedDistance, result*1000, 100); //The error between the desired distance and the actual distance is asserted to be at most 100 meter
    }
 @Autowired
amountMapper amountMapper;

   @Test
    public void testCountUp(){

     QueryWrapper queryWrapper = new QueryWrapper();
     queryWrapper.eq("name", 2);
     amount amount = amountMapper.selectOne(queryWrapper);
     int exist=amount.getExist();//get exist here
     amount.setExist(exist -1);// mines 1 here
     UpdateWrapper updateWrapper = new UpdateWrapper();
     updateWrapper.eq("name", amount.getName());
     amountMapper.update(amount, updateWrapper);
     amount amount2 = amountMapper.selectOne(queryWrapper);
     // Exist reduces one, so the final number of existences + 1 will be the same as the first exist
     Assertions.assertEquals(exist, amount2.getExist()+1);
     // add ,and reduces in same rule;


 }

}
