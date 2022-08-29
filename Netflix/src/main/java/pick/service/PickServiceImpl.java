package pick.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import pick.bean.PickDTO;
import pick.dao.PickDAO;

@Service
public class PickServiceImpl implements PickService {
	
	@Autowired
	PickDAO pickDAO = null;

	@Override
	public void addPickUp(PickDTO pickDTO) {
		String current = pickDAO.getPicksID();
		int seq;
		if(current == null) {
			seq = 1;
		}
		else {
			seq = Integer.parseInt(current)+1;
		}
		pickDTO.setPicks_id(seq);
		pickDAO.addPickUp(pickDTO);
	}
}
