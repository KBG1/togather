package com.common.togather.api.controller;

import com.common.togather.api.response.AlarmFindByMemberResponse;
import com.common.togather.api.response.ErrorResponseDto;
import com.common.togather.api.response.ResponseDto;
import com.common.togather.api.service.AlarmService;
import com.common.togather.common.util.JwtUtil;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/alarms")
@RequiredArgsConstructor
public class AlarmController {

    private final AlarmService alarmService;
    private final JwtUtil jwtUtil;

    // 알림 조회
    @Operation(summary = "알림 조회")
    @GetMapping
    @ApiResponses(value = {
            @ApiResponse(
                    responseCode = "200",
                    description = "알림 조회를 성공했습니다."
            ),
            @ApiResponse(
                    responseCode = "404",
                    description = "해당 이메일로 가입된 회원이 없습니다.",
                    content = @Content(schema = @Schema(implementation = ErrorResponseDto.class))
            ),
    })
    public ResponseEntity<ResponseDto<List<AlarmFindByMemberResponse>>> findAllAlarmByMember(
            @RequestHeader(value = "Authorization", required = false) String token) {

        ResponseDto<List<AlarmFindByMemberResponse>> responseDto = ResponseDto.<List<AlarmFindByMemberResponse>>builder()
                .status(HttpStatus.OK.value())
                .message("알림 조회를 성공했습니다.")
                .data(alarmService.findAllAlarmByMember(
                        jwtUtil.getAuthMemberEmail(token)))
                .build();

        return new ResponseEntity<>(responseDto, HttpStatus.OK);
    }
}